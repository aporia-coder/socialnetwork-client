import { GET_SCREAMS, LOADING_DATA } from "../types";
import axios from "axios";

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then((res) => {
      dispatch({ type: GET_SCREAMS, payload: res.data.data });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
