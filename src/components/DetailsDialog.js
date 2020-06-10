import React, { useState } from "react";

// MUI
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import CreateIcon from "@material-ui/icons/Create";

// Redux
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/types";
import { uploadDetails } from "../redux/actions/userActions";

const DetailsDialog = () => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(uploadDetails(details));
    handleToggle();
  };

  // Styles here dont work
  const useStyles = makeStyles((theme) => ({
    buttonContainer: {
      display: "flex",
      justifyContent: "spaceBetween",
      width: "100%",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Tooltip title="Upload Details">
        <IconButton onClick={handleToggle}>
          <CreateIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>Enter Profile Details</DialogTitle>
        <DialogContent>
          <TextField
            name="bio"
            label="Bio"
            fullWidth
            m={2}
            onChange={handleChange}
          />
          <TextField
            name="location"
            label="Location"
            fullWidth
            m={2}
            onChange={handleChange}
          />
          <TextField
            name="website"
            label="Website"
            fullWidth
            m={2}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <div className={classes.buttonContainer}>
            <Button color="primary" onClick={handleToggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailsDialog;
