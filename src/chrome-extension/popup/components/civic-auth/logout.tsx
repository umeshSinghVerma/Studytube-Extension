import { useCivicAuth } from "../../hooks/civic-auth-context";

export const LogoutButton = () => {
  const { signOut, loading } = useCivicAuth();
  return (
    <button onClick={signOut} disabled={loading}>
      {loading ? "Logging out..." : "Sign Out"}
    </button>
  );
};
