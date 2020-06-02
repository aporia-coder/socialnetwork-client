import React from "react";
import { Link } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar className="container-nav">
        <Button
          color="inherit"
          className={classes.menuButton}
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button
          color="inherit"
          className={classes.menuButton}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          color="inherit"
          className={classes.menuButton}
          component={Link}
          to="/signup"
        >
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
};
