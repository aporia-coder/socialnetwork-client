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

const Signup = () => {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      userName: details.userName,
      email: details.email,
      password: details.password,
      confirmPassword: details.confirmPassword,
    };
    const { password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      setLoading(false);
      return setErrors("Passwords must match");
    }
    axios
      .post("/users/signup", userData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.error);
        setLoading(false);
      });
  };

  // const handleSubmit = (e) => {
  //   const newUserData = {
  //     userName: details.userName,
  //     email: details.email,
  //     password: details.password,
  //     confirmPassword: details.password,
  //   };
  //   const { password, confirmPassword } = newUserData;
  //   if (password === confirmPassword) {
  //     e.preventDefault();
  //     setLoading(true);
  //     axios
  //       .post("/users/signup", newUserData)
  //       .then((res) => {
  //         localStorage.setItem("token", res.data.token);
  //         setLoading(false);
  //         history.push("/");
  //       })
  //       .catch((err) => {
  //         setErrors(err);
  //         setLoading(false);
  //       });
  //   } else {
  //     return setErrors("Passwords must match");
  //   }
  // };

  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.icon} />
        <Grid item sm>
          <Typography variant="h2" className={classes.title}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              label="Enter Username"
              name="userName"
              onChange={handleChange}
              className={classes.textField}
              error={errors ? true : false}
              fullWidth
            />
            <TextField
              label="Enter Email"
              type="email"
              name="email"
              onChange={handleChange}
              className={classes.textField}
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
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
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
              Sign Up
              {loading && <CircularProgress className={classes.progress} />}
            </Button>
            <br />
            <small>
              Already have an account? Login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
