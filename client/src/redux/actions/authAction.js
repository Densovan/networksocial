import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  //==============Login================
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  // CURRENT_USER,
  USER_LOGOUT,
  USER_REGISTER_RESET,
} from "../constants/userConstants";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/user/register", userData, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_REGISTER_RESET,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

//==================>login<================
export const loginUser = (userData, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/user/login", userData, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    //save to localstorage
    const { token } = data;
    //set token to local storage
    localStorage.setItem("userToken", JSON.stringify(data));
    //Set Token to Auth header
    setAuthToken(token);
    // setAuthToken(true);
    //Decode token to get user data
    const decode = jwt_decode(token);
    //set current user
    // dispatch(setCurrentUser(decode));
    console.log("decode", decode);
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

//Set logged in user
// export const setCurrentUser = (decode) => {
//   return {
//     type: CURRENT_USER,
//     payload: decode,
//   };
// };

// Log user out
export const logoutUser = () => (dispatch) => {
  //Remove Token from localstorage
  localStorage.removeItem("userToken");
  //Remvoe auth header for future request
  // setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  // dispatch(setCurrentUser({}));
  dispatch({
    type: USER_LOGOUT,
  });
};
