import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Icons
import AppIcon from "../assets/img/monkey.png";

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    width: "25rem",
    margin: "auto",
  },
  icon: {
    margin: "1rem, 0",
    width: "5rem",
  },
}));

const Error = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} spacing={5}>
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.icon} />
      </Grid>
      <Grid>
        <Typography variant="h2">404</Typography>
        <Typography variant="body1">Page not found</Typography>
      </Grid>
    </Grid>
  );
};

export default Error;
