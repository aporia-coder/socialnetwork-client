import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    minHeight: "9rem",
    marginBottom: "2rem",
  },
  image: {
    objectFit: "cover",
    position: "center, center",
    minWidth: "12rem",
  },
  content: {
    padding: "1rem",
  },
}));

const Scream = ({ userName, createdAt, body, image }) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card} raised={true}>
      <CardMedia image={image} className={classes.image} />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/users/${userName.toLowerCase()}`}
        >
          {userName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Scream;
