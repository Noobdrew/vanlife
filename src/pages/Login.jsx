import { useState, useRef, useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../api";
import { signInWithEmailAndPassword } from "firebase/auth";
import { VanApiContext } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useContext(VanApiContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  console.log(currentUser);
  if (currentUser) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {error && <h3 className="login-error">{error.message}</h3>}

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
