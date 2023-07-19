import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired() {
  const auth = false;
  if (auth) return <Outlet />;
  return <Navigate to="/login" state={{ message: "You must login first" }} />;
}
