import AuthModal from "./AuthModal";

function AuthPage() {
  return (
    <div style={{ padding: "40px", background: "#f5f5f5", height: "100vh" }}>
      <AuthModal onClose={() => window.close()} />
    </div>
  );
}

export default AuthPage;
