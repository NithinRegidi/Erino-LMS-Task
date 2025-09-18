import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirect to login after logout
  };

  // --- Style Objects ---
  // ... (all your existing style objects are perfect, no changes needed here)
  const headerStyle = {
    background: "rgba(15, 23, 42, 0.8)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(8px)",
    position: "sticky",
    top: 0,
    zIndex: 50,
    fontFamily: "Inter, system-ui, sans-serif",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "12px 24px",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#e5e7eb",
    textDecoration: "none",
  };

  const brandLogoStyle = {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #2563eb, #60a5fa)",
  };

  const linksContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  };

  const linkStyle = {
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: "0.9rem",
  };

  const userNameStyle = {
    color: "#9ca3af",
    fontSize: "0.9rem",
  };

  const buttonBaseStyle = {
    padding: "8px 16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    background: "transparent",
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const primaryButtonStyle = {
    ...buttonBaseStyle,
    background: "#2563eb",
    borderColor: "#2563eb",
    color: "white",
    textDecoration: "none", // For Link component
  };


  // ...existing code...
  // --- JSX Structure ---

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        {/* Left Side: Logo and Brand */}
        <Link to="/" style={brandStyle}>
          <div style={brandLogoStyle}></div>
          Erino LMS
        </Link>

        {/* Right Side: Dynamic Links */}
        <div style={linksContainerStyle}>
          {user ? (
            // Shows when user is logged in
            <>
              <Link to="/leads" style={linkStyle}>Dashboard</Link>
              <span style={userNameStyle}>Hi, {user.name}</span>
              <button onClick={handleLogout} style={buttonBaseStyle}>Logout</button>
            </>
          ) : (
            // Shows when user is logged out
            <>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={primaryButtonStyle}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;