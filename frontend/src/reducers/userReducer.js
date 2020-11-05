import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return {...state, loading: true };
    case USER_SIGNIN_FAIL:
      return {...state, loading: false, error: action.payload };
    case USER_SIGNIN_SUCCESS:
      return {...state, loading: false, userInfo: action.payload };
      case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNUP_FAIL:
      return {...state, loading: false, error: action.payload };
    case USER_SIGNUP_SUCCESS:
      return {...state, loading: false, userInfo: action.payload };
    default:
      return state;
  }
};