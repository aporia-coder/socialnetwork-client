import axios from "axios";

export const addHeadersAndToken = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["x-auth-header"] = token;
};
