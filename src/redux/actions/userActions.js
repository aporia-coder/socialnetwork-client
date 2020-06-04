import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/users/login", userData)
    .then((res) => {
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      localStorage.setItem("token", res.data.token);
      dispatch(getUserDetails());
      history.push("/");
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

export const getUserDetails = () => (dispatch) => {
  axios.get("/users/user").then((res) => {
    dispatch({ type: SET_USER, payload: res.data.data });
  });
};
