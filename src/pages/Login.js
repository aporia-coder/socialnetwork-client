import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import AppIcon from "../assets/img/monkey.png";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

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
  textField: {
    margin: "2rem auto",
  },
  button: {
    marginBottom: "2rem",
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
}));

const Login = () => {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: details.email,
      password: details.password,
    };
    setLoading(true);
    axios
      .post("/users/login", userData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err.response.data.error);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.icon} />
        <Grid item sm>
          <Typography variant="h2" className={classes.title}>
            Login
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              label="Enter Email"
              type="email"
              name="email"
              onChange={handleChange}
              className={classes.textField}
              helperText={errors}
              error={errors ? true : false}
              fullWidth
            />
            <TextField
              label="Enter Password"
              type="password"
              name="password"
              onChange={handleChange}
              className={classes.textField}
              error={errors ? true : false}
              helperText={errors}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
              disabled={loading ? true : false}
            >
              Login
              {loading && <CircularProgress className={classes.progress} />}
            </Button>
            <br />
            <small>
              Don't have an account? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
