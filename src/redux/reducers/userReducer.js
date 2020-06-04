import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return state;
    case SET_USER: {
      return {
        authenticated: true,
        credentials: { ...action.payload },
      };
    }
    default:
      return state;
  }
}
