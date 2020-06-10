import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

// MUI
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logoutUser } from "./redux/actions/userActions";

// Global styles
import "./styles/App.scss";

// Pages
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Components
import { Navbar } from "./components/Navbar";
import { AuthRoute } from "./utilities/AuthRoute";
// Theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);

  // logging out users when token expires, redirect to login page if page refreshes

  let token = localStorage.token;
  if (token) {
    let decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      dispatch({ type: "SET_AUTHENTICATED" });
      axios.defaults.headers.common["x-auth-token"] = token;
      dispatch(getUserDetails());
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
