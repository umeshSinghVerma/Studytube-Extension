const CIVIC_CLIENT_ID = "8d2ee20a-b1f7-4bc2-89a9-2648289e05bb";
const REDIRECT_URI = `https://${chrome.runtime.id}.chromiumapp.org/`;
console.log("redirect_uri ",REDIRECT_URI);
const CIVIC_TOKEN_URL = "https://auth.civic.com/oauth/token";
const CIVIC_USERINFO_URL = "https://auth.civic.com/oauth/userinfo";

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join('');
}

async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// 👇 Step 1: Sign in and get access_token
export async function signInWithCivic() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = crypto.randomUUID();

  // Save verifier/state temporarily for later token exchange
  await chrome.storage.local.set({ civicCodeVerifier: codeVerifier, civicState: state });

  const authUrl = `https://auth.civic.com/oauth/auth?` + new URLSearchParams({
    response_type: "code",
    client_id: CIVIC_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "openid profile email",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    state,
    prompt: "login",
  }).toString();

  return new Promise<void>((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true,
      },
      async (redirectUrl) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else if (redirectUrl) {
          const url = new URL(redirectUrl);
          const code = url.searchParams.get("code");
          const returnedState = url.searchParams.get("state");

          const { civicCodeVerifier, civicState } = await chrome.storage.local.get(["civicCodeVerifier", "civicState"]);
          if (returnedState !== civicState) {
            return reject("State mismatch. Possible CSRF attack.");
          }

          try {
            const tokenResponse = await fetch(CIVIC_TOKEN_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: CIVIC_CLIENT_ID,
                code: code || "",
                redirect_uri: REDIRECT_URI,
                code_verifier: civicCodeVerifier,
              }),
            });

            const tokenData = await tokenResponse.json();

            if (tokenData.access_token) {
              await chrome.storage.local.set({ civicToken: tokenData });
              resolve();
            } else {
              reject("Failed to retrieve access token");
            }
          } catch (err) {
            reject("Token exchange failed: " + err);
          }
        } else {
          reject("Authorization failed.");
        }
      }
    );
  });
}

// 👇 Step 2: Fetch user profile
export async function getCivicUserInfo(): Promise<unknown | null> {
  const { civicToken } = await chrome.storage.local.get("civicToken");

  if (!civicToken || !civicToken.access_token) return null;

  try {
    const res = await fetch(CIVIC_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${civicToken.access_token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch user info");
    return await res.json();
  } catch (error) {
    console.error("User info error:", error);
    return null;
  }
}

// 👇 Step 3: Logout (optional Civic logout + local token clear)
export async function logoutCivic() {
  await chrome.storage.local.remove(["civicToken", "civicCodeVerifier", "civicState"]);

  const logoutUrl = "https://auth.civic.com/logout";

  chrome.identity.launchWebAuthFlow(
    {
      url: logoutUrl,
      interactive: true, // 👈 Open visible logout page
    },
    (responseUrl) => {
      console.log(responseUrl,"Civic session cleared.");
    }
  );
}

export async function isUserSignedIn(): Promise<boolean> {
  const { civicToken } = await chrome.storage.local.get("civicToken");
  return !!(civicToken && civicToken.access_token);
}

export async function getAccessToken(): Promise<string | null> {
  const { civicToken } = await chrome.storage.local.get("civicToken");
  return civicToken?.access_token ?? null;
}
