import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import ErrorPage from "./Pages/ErrorPage";
import Header from "./Components/Header";
import DashboardPage from "./Pages/DashboardPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setToken, setUserData } from "./store/slices/authSlice";

function App() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    console.log(userdata);
    if (userdata && userdata.token) {
      dispatch(setToken(userdata.token));
      dispatch(setUserData(userdata));
      dispatch(login());
    }
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={AuthPage} exact>
          {isLogged && <Redirect to="/dashboard" />}
        </Route>
        <Route path="/dashboard" component={DashboardPage}>
          {!isLogged && <Redirect to="/" />}
        </Route>
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
