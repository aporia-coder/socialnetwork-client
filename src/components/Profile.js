import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

// Redux
import { uploadImage } from "../redux/actions/userActions";

// MUI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import CreateIcon from "@material-ui/icons/Create";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

export const Profile = () => {
  const {
    bio,
    location,
    website,
    userName,
    createdAt,
    profileImage,
  } = useSelector((state) => state.user.credentials);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image, image.name);
    dispatch(uploadImage(formData));
  };

  const handleChange = (e) => {
    const imageFile = document.getElementById("image");
    imageFile.click();
  };

  const authenticated = useSelector((state) => state.user.authenticated);

  const useStyles = makeStyles((theme) => ({
    imageContainer: {
      display: "flex",
      position: "relative",
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
    toolTip: {
      position: "absolute",
      right: theme.spacing(1),
      bottom: theme.spacing(2),
      marginRight: "6rem",
    },
    icons: {
      textAlign: "center",
      paddingTop: "1rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "spaceBetween",
      textAlign: "center",
    },
    buttons: {
      justifySelf: "center",
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
            <Tooltip title="Upload a Profile Image" className={classes.toolTip}>
              <IconButton onClick={handleChange}>
                <CreateIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>

          <input
            type="file"
            id="image"
            hidden="hidden"
            onChange={handleSubmit}
          />
          <Typography
            color="primary"
            variant="h5"
            align="center"
            className="pb-1"
          >
            @{userName}
          </Typography>
          <Typography variant="body1" align="center" className="pb-1">
            <CalendarTodayIcon
              fontSize="large"
              color="primary"
              className={classes.icons}
            />
            {dayjs(createdAt).format("MMM YYYY")}
          </Typography>
          {bio && (
            <Typography variant="body1" align="center" className="pb-1">
              <AccountCircleIcon
                color="primary"
                className={classes.icons}
                fontSize="large"
              />
              {bio}
            </Typography>
          )}
          {location && (
            <Typography variant="body1" align="center" className="pb-1">
              <LocationOnIcon
                color="primary"
                fontSize="large"
                className={classes.icons}
              />
              {location}
            </Typography>
          )}
          {website && (
            <Typography
              color="primary"
              variant="body1"
              align="center"
              className="pb-2"
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
