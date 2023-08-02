import { useState, useRef, useContext, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../api";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { VanApiContext } from "../App";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const { currentUser, setPopupOpen, setPopupText } = useContext(VanApiContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passReset, setPassReset] = useState(false);
  useEffect(() => {
    setPassReset(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setPopupText(`Password reset email sent!`);
      setPopupOpen(true);
      setPassReset(true);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  if (passReset) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="login-container">
      <h1>Password reset</h1>
      {error && <h3 className="login-error">{error.message}</h3>}

      <form action="" className="login-form" onSubmit={handleSubmit}>
        <input
          name="email"
          onInput={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email adress"
        />
        <button type="submit" disabled={loading}>
          Reset Password
        </button>
      </form>
      <small>
        Already have an accound?{" "}
        <Link className="create-account-link" to="/login">
          Log in
        </Link>
      </small>

      <small>
        Don't have an account?{" "}
        <Link className="create-account-link" to="/signup">
          Create one now
        </Link>
      </small>
    </div>
  );
}
