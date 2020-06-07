import React from "react";
import { Redirect, Route } from "react-router-dom";

export const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated && localStorage.token ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
