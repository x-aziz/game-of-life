import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export function LoginScreen() {
  async function handleLogin() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fffde0",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ fontSize: "52px", marginBottom: "16px" }}>📋</div>
      <h1
        style={{
          fontSize: "26px",
          fontWeight: 600,
          color: "#5a4a00",
          marginBottom: "6px",
        }}
      >
        Said Abdelaziz's Life CRM
      </h1>
      <p style={{ fontSize: "13px", color: "#999", marginBottom: "40px" }}>
        Your digital yellow paper system
      </p>
      <button
        onClick={handleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "13px 28px",
          background: "white",
          border: "1px solid #e0d800",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          color: "#333",
          boxShadow: "0 2px 10px rgba(200,180,0,0.15)",
        }}
      >
        <img
          src="https://www.google.com/favicon.ico"
          width="16"
          height="16"
          alt="Google"
        />
        Sign in with Google
      </button>
      <p style={{ marginTop: "28px", fontSize: "11px", color: "#ccc" }}>
        Your data is private — stored securely in Firebase
      </p>
    </div>
  );
}

export function UserMenu({ user }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt=""
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "1px solid #e0d800",
          }}
        />
      )}
      <span style={{ fontSize: "11px", color: "#999" }}>
        {user.displayName?.split(" ")[0]}
      </span>
      <button
        onClick={() => signOut(auth)}
        style={{
          background: "none",
          border: "1px solid #e0d800",
          cursor: "pointer",
          color: "#bbb",
          fontSize: "10px",
          borderRadius: "6px",
          padding: "3px 8px",
        }}
      >
        Sign out
      </button>
    </div>
  );
}
