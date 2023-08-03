import { useState, useRef, useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../api";
import { signInWithEmailAndPassword } from "firebase/auth";
import { VanApiContext } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPopupText(`Welcome back ${auth.currentUser.displayName}`);
      setPopupOpen(true);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {error && <h3 className="login-error">{error.message}</h3>}

      <form action="" className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit" disabled={loading}>
          Sign in
        </button>
      </form>
      <small>
        Forgotten your password?{" "}
        <Link className="create-account-link" to="/resetpass">
          Reset Password
        </Link>
      </small>

      <small>
        Don't have an account?{" "}
        <Link className="create-account-link" to="/signup">
          Create one now
        </Link>
      </small>
      <small>Sample user with data b@b.com pass: 123456</small>
    </div>
  );
}
