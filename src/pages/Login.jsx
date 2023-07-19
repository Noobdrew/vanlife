import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loginUser } from "../api";
export default function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  const message = location?.state?.message;
  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);

    loginUser(loginFormData).then((data) => console.log(data));
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
        <button>Sign in</button>
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
