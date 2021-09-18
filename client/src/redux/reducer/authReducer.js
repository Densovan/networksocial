import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  //==============Login================
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  // CURRENT_USER,
  USER_LOGOUT,
} from "../constants/userConstants";
// import isEmpty from "../../validation/is-empty";

// const initialState = {
//   isAuthenticated: false,
//   user: {},
// };
//===================>Register<======================
export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        user_Register: action.payload,
      };
    case USER_REGISTER_RESET:
      return {
        laoding: false,
        reset_register: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
//===================>Login<====================
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    // case CURRENT_USER:
    //   return {
    //     ...state,
    //     isAuthenticated: !isEmpty(action.payload),
    //     user: action.payload,
    //   };
    default:
      return state;
  }
};
