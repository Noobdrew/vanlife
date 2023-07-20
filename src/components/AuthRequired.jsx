import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequired() {
  const isLoggedIn = localStorage.getItem("loggedin");
  const { pathname } = useLocation();

  if (!isLoggedIn)
    return (
      <Navigate
        to="/login"
        state={{ message: "You must log in first", prevLocation: pathname }}
        replace
      />
    );
  return <Outlet />;
}
