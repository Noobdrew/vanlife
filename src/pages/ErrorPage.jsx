import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link className="error-page-link" to="/">
        Return to home
      </Link>
    </div>
  );
}
