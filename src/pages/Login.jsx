import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const message = location?.state?.message;
  const prevLocation = location?.state?.prevLocation || "/host";

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    loginUser(loginFormData)
      .then((data) => {
        localStorage.setItem("loggedin", true);
        navigate(prevLocation, { replace: true });
      })
      .catch((err) => setError(err?.message))
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <h1>{message ? message : "Sign in to your account"}</h1>
      {error && <h3 className="login-error">{error}</h3>}

      <form action="" className="login-form" onSubmit={handleSubmit}>
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email adress"
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={status == "submitting"}>Sign in</button>
      </form>
      <small>
        Don't have an account?{" "}
        <Link className="create-account-link" to=".">
          Create one now
        </Link>
      </small>
    </div>
  );
}
