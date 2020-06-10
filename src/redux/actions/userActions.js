import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";
import { addHeadersAndToken } from "../../utilities/addHeadersAndToken";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/users/login", userData)
    .then((res) => {
      addHeadersAndToken(res.data.token);
      dispatch(getUserDetails());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

export const signUpUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  const { password, confirmPassword } = userData;
  axios
    .post("/users/signup", userData)
    .then((res) => {
      if (password === confirmPassword) {
        addHeadersAndToken(res.data.token);
        dispatch(getUserDetails());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      } else {
        dispatch({
          type: SET_ERRORS,
          payload: ["Passwords must match"],
        });
      }
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data.error });
    });
};

export const logoutUser = (history) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  delete axios.defaults.headers.common["x-auth-token"];
  localStorage.removeItem("token");
  dispatch({ type: SET_UNAUTHENTICATED });
  history.push("/login");
};

export const getUserDetails = () => (dispatch) => {
  axios.get("/users/user").then((res) => {
    dispatch({ type: SET_USER, payload: res.data.data });
  });
};

export const uploadImage = (image) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/users/image", image)
    .then((res) => {
      dispatch(getUserDetails());
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const uploadDetails = (userDetails) => (dispatch) => {
  axios.post("/users", userDetails).then((res) => {
    dispatch({ type: SET_USER, payload: res.data.data });
  });
};
