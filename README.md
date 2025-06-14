## 🔐 Civic Auth in Chrome Extensions

> ⚠️ **Note**: [Civic](https://www.civic.com/) does **not officially support** authentication inside Chrome Extensions.
> ✅ I have built a full PKCE-based workaround using `chrome.identity` that **enables Civic login in Chrome Extensions**.

This solution is battle-tested for Civic OAuth2 and can be used by **other devs** building Chrome Extensions for Web3 apps.

---

### ✨ Features

* Uses [PKCE](https://oauth.net/2/pkce/) flow for secure OAuth
* Civic login using `chrome.identity.launchWebAuthFlow`
* Fetches Civic user profile and stores token securely
* Logout with token + session cleanup
* Built-in `isSignedIn` and `getAccessToken` helpers

---

### 🚀 Usage (API)

```ts
await signInWithCivic();              // Launch Civic sign-in popup
const user = await getCivicUserInfo(); // Get Civic user details
const isSignedIn = await isUserSignedIn(); // Check login status
const token = await getAccessToken(); // Get Civic access token
await logoutCivic();                 // Log out and clean session
```

---

### 🧩 Civic Auth Chrome Extension Implementation

```ts
const CIVIC_CLIENT_ID = "YOUR_CLIENT_ID";
const REDIRECT_URI = `https://${chrome.runtime.id}.chromiumapp.org/`;
const CIVIC_TOKEN_URL = "https://auth.civic.com/oauth/token";
const CIVIC_USERINFO_URL = "https://auth.civic.com/oauth/userinfo";

function generateCodeVerifier(length = 128) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join('');
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function signInWithCivic() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = crypto.randomUUID();

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
  });

  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      async (redirectUrl) => {
        if (chrome.runtime.lastError) return reject(chrome.runtime.lastError.message);

        if (redirectUrl) {
          const url = new URL(redirectUrl);
          const code = url.searchParams.get("code");
          const returnedState = url.searchParams.get("state");

          const { civicCodeVerifier, civicState } = await chrome.storage.local.get(["civicCodeVerifier", "civicState"]);
          if (returnedState !== civicState) return reject("State mismatch. Possible CSRF attack.");

          try {
            const tokenRes = await fetch(CIVIC_TOKEN_URL, {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: CIVIC_CLIENT_ID,
                code: code || "",
                redirect_uri: REDIRECT_URI,
                code_verifier: civicCodeVerifier,
              }),
            });

            const tokenData = await tokenRes.json();
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

export async function getCivicUserInfo() {
  const { civicToken } = await chrome.storage.local.get("civicToken");
  if (!civicToken || !civicToken.access_token) return null;

  try {
    const res = await fetch(CIVIC_USERINFO_URL, {
      headers: { Authorization: `Bearer ${civicToken.access_token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch user info");
    return await res.json();
  } catch (error) {
    console.error("User info error:", error);
    return null;
  }
}

export async function logoutCivic() {
  await chrome.storage.local.remove(["civicToken", "civicCodeVerifier", "civicState"]);
  const logoutUrl = "https://auth.civic.com/logout";
  chrome.identity.launchWebAuthFlow({ url: logoutUrl, interactive: true }, (url) => {
    console.log("Logged out from Civic.");
  });
}

export async function isUserSignedIn() {
  const { civicToken } = await chrome.storage.local.get("civicToken");
  return !!(civicToken && civicToken.access_token);
}

export async function getAccessToken() {
  const { civicToken } = await chrome.storage.local.get("civicToken");
  return civicToken?.access_token ?? null;
}
```

---

### 📎 Notes

* This was tested using Manifest V3.
* Be sure to add the following permissions in your `manifest.json`:

```json
"permissions": ["identity", "storage"],
"oauth2": {
  "client_id": "YOUR_CLIENT_ID",
  "scopes": ["openid", "profile", "email"]
},
"externally_connectable": {
  "matches": ["https://*.chromiumapp.org/"]
}
```

* Register your `https://<EXTENSION_ID>.chromiumapp.org/` URL in the [Civic Developer Console](https://www.civic.com/).

---

🧩 How to Add This Extension to Chrome

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Build the extension**

   ```bash
   npm run build
   ```

3. **Load the extension in Chrome**

   * Open Chrome and go to `chrome://extensions/`
   * Enable **Developer mode** (top right)
   * Click **Load unpacked**
   * Select the `dist/` folder inside the project

