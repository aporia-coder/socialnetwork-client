import React, { useEffect, useState } from "react";
import axios from "axios";

// Components
import Scream from "../components/Scream";
import { ReactComponent as Spinner } from "../assets/img/spinner.svg";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Home = () => {
  const [screams, setScreams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load screams
  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        setScreams(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : screams ? (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screams.map((scream) => (
          <Scream
            userName={scream.userName}
            createdAt={scream.createdAt}
            key={scream._id}
            body={scream.body}
            image={scream.profileImage}
          />
        ))}
      </Grid>
      <Grid item sm={4} xs={12}>
        right..
      </Grid>
    </Grid>
  ) : (
    <Typography>No Screams Posted Yet</Typography>
  );
};

export default Home;
