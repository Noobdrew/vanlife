import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { auth } from "../api";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login({ currentUser, setCurrentUser }) {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {error && <h3 className="login-error">{error}</h3>}

      <form action="" className="login-form">
        <input
          name="email"
          onInput={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email adress"
        />
        <input
          name="password"
          onInput={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button type="button" disabled={loading} onClick={handleSubmit}>
          Sign in
        </button>
      </form>
      <small>
        Don't have an account?{" "}
        <Link className="create-account-link" to=".">
          Create one now
        </Link>
      </small>
      <small>login info: email: b@b.com pass: 123456</small>
    </div>
  );
}
