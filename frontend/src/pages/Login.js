


import { useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../pages/styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/login", { email, password });
      const res = await api.get("/auth/me");
      setUser(res.data);
      navigate("/leads");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-sub">Sign in to continue to Erino LMS.</p>

        {error && <div className="login-error">{error}</div>}
        {successMessage && !error && <div className="login-success">{successMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-group">
            <label htmlFor="email" className="login-label">Email Address</label>
            <input
              id="email"
              className="login-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

            <div className="login-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              id="password"
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/register" className="login-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;