import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export const Profile = () => {
  const {
    bio,
    location,
    website,
    userName,
    createdAt,
    profileImage,
  } = useSelector((state) => state.user.credentials);

  const authenticated = useSelector((state) => state.user.authenticated);

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: "1rem",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
    image: {
      width: 200,
      height: 200,
      objectFit: "cover",
      borderRadius: "50%",
      padding: "1rem",
    },
    icons: {
      alignItems: "center",
      paddingRight: "1rem",
    },
    buttonContainer: {
      textAlign: "center",
    },
    buttons: {
      textAlign: "center",
      margin: "2rem",
    },
  }));

  const classes = useStyles();

  return (
    <>
      {authenticated ? (
        <Paper elevation={3}>
          <div className={classes.imageContainer}>
            <img
              src={profileImage}
              alt="profileImage"
              className={classes.image}
            />
          </div>
          <Typography
            color="primary"
            variant="h5"
            align="center"
            className="pb-1"
          >
            @{userName}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            className="pb-1"
          >
            Joined: {dayjs(createdAt).format("MMM YYYY")}
          </Typography>
          {bio && (
            <Typography
              color="textSecondary"
              variant="body1"
              align="center"
              className="pb-1"
            >
              <AccountCircleIcon color="primary" className={classes.icons} />{" "}
              {bio}
            </Typography>
          )}
          {location && (
            <Typography
              color="textSecondary"
              variant="body1"
              align="center"
              className="pb-1"
            >
              <LocationOnIcon color="primary" />
              {location}
            </Typography>
          )}
          {website && (
            <Typography
              color="primary"
              variant="body1"
              align="center"
              className="pb-1"
            >
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </Typography>
          )}
        </Paper>
      ) : (
        <>
          <Paper elevation={3} className={classes.paper}>
            <Typography color="primaryText">
              Don't have an account? Login or Sign Up below
            </Typography>
            <div className="buttonContainer">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
                className={classes.buttons}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/signup"
                className={classes.buttons}
              >
                Signup
              </Button>
            </div>
          </Paper>
        </>
      )}
    </>
  );
};

export default Profile;
