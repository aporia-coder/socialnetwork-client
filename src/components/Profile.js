import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

// Components
import DetailsDialog from "./DetailsDialog";

// Redux
import { uploadImage, logoutUser } from "../redux/actions/userActions";

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
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

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
  const dispatch = useDispatch();
  const history = useHistory();

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

  const useStyles = makeStyles((theme) => ({
    profileContainer: {
      position: "relative",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
    image: {
      maxWidth: 250,
      minHeight: 250,
      objectFit: "cover",
      borderRadius: "50%",
      padding: "1rem",
    },
    toolTip: {
      position: "absolute",
      right: "15%",
      top: "10%",
    },
    icons: {
      verticalAlign: "center",
      paddingTop: "1rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "spaceBetween",
      textAlign: "center",
    },
    buttons: {
      margin: "2rem",
    },
    paper: {
      textAlign: "center",
      padding: "1rem",
    },
  }));

  const classes = useStyles();

  return (
    <>
      {authenticated ? (
        <Paper elevation={3} className={classes.profileContainer}>
          <div className={classes.imageContainer}>
            <img
              src={profileImage}
              alt="profileimage"
              className={classes.image}
            />
            <Tooltip title="Upload a Profile Image" className={classes.toolTip}>
              <IconButton onClick={handleChange}>
                <PhotoCameraIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>

          <input
            type="file"
            id="image"
            hidden="hidden"
            onChange={handleSubmit}
          />
          <Typography color="primary" variant="h5" align="center">
            @{userName}
          </Typography>
          {bio && (
            <Typography variant="body2" align="center">
              {bio}
            </Typography>
          )}
          {location && (
            <Typography variant="body1" align="center">
              <LocationOnIcon
                color="primary"
                fontSize="large"
                className={classes.icons}
              />
              {location}
            </Typography>
          )}
          {website && (
            <Typography color="primary" variant="body1" align="center">
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </Typography>
          )}
          <Typography variant="body1" align="center" className="pb-1">
            <CalendarTodayIcon
              fontSize="large"
              color="primary"
              className={classes.icons}
            />
            Joined: {dayjs(createdAt).format("MMM YYYY")}
          </Typography>
          <Tooltip title="Logout" className={classes.logout}>
            <IconButton onClick={() => dispatch(logoutUser(history))}>
              <KeyboardReturnIcon color="primary" />
            </IconButton>
          </Tooltip>
          <DetailsDialog />
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
