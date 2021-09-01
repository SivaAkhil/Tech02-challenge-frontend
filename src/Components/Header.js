import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/Button";
import { logout, setToken, setUserData } from "../store/slices/authSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUserData(null));
    dispatch(setToken(null));
    dispatch(logout());
  };

  return (
    <div className="header-container">
      <h1>Title</h1>
      <ul>
        {isLogged && (
          <li onClick={handleLogout}>
            <Button name="Log Out" />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
