import { Link } from "react-router-dom";

const ErrorPage = (props) => {
  return (
    <div>
      <h1>Oops Something went wrong.Please Try Again</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
