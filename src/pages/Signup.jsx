import { useState, useRef, useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../api";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { VanApiContext } from "../App";

export default function Signup() {
  const { currentUser, setPopupText, setPopupOpen } = useContext(VanApiContext);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError({});
    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
      setPopupText(`Account created, welcome ${userName}`);
      setPopupOpen(true);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  console.log(currentUser);
  if (currentUser && !loading) {
    return <Navigate to="/profile" />;
  }
  if (loading)
    return (
      <div className="loader-conteiner">
        <h1>Creating Account</h1>
        <span className="loader"></span>
      </div>
    );
  return (
    <div className="login-container">
      <h1>Create account</h1>
      {error && <h3 className="login-error">{error.message}</h3>}

      <form action="" className="login-form" onSubmit={handleSubmit}>
        <input
          name="userName"
          onInput={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="User Name 3-11 characters"
          minLength={3}
          maxLength={11}
        />
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
          placeholder="Password 6-12 characters"
          minLength={6}
          maxLength={12}
        />
        <input
          name="confirm-password"
          onInput={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password 6-12 characters"
          minLength={6}
          maxLength={12}
        />
        <button type="submit" disabled={loading}>
          Sign up
        </button>
      </form>
      <small>
        Already have an accound?{" "}
        <Link className="create-account-link" to="/login">
          Log in
        </Link>
      </small>
    </div>
  );
}
