import { GET_SCREAMS, LOADING_DATA } from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case GET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    default:
      return initialState;
  }
}
