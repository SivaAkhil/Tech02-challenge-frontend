import { useState } from "react";
import Login from "../Components/login";
import Signup from "../Components/Signup";
import "./authpage.css";

const AuthPage = (props) => {
  const [login, setLogin] = useState(false);

  const handleLogControl = () => {
    setLogin(!login);
  };

  return (
    <div className="authpage-container">
      {!login ? (
        <>
          <h1>Log In</h1>
          <Login handleLogControl={handleLogControl} />
          <p className="auth-alternate-text">
            Not yet a member.Try
            <span
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "1.5em",
              }}
              onClick={handleLogControl}
            >
              Sign up
            </span>
          </p>
        </>
      ) : (
        <>
          <h1>Sign Up</h1>
          <Signup handleLogControl={handleLogControl} />
          <p className="auth-alternate-text">
            Dont Have account.Try{" "}
            <span
              style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "1.5em",
              }}
              onClick={handleLogControl}
            >
              Log in
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;
