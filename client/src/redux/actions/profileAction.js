import {
  //=================>Get current user<=================
  CURRENT_USER_FAIL,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  //==================> Create profile user<============
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  //============>Delete profile<==============
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  PROFILE_CREATE_RESET,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
} from "../constants/profileContant";
import axios from "axios";
import { logoutUser } from "../actions/authAction";

//=============>Get current user<=============
export const getCurrentUser = () => async (dispatch, getState) => {
  // var token = JSON.parse(localStorage.getItem("userToken"));
  try {
    dispatch({
      type: CURRENT_USER_REQUEST,
    });
    const {
      loginUser: { user },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    };
    // console.log("user", user.token);
    const { data } = await axios.get("/api/profile/me", config);
    dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CURRENT_USER_FAIL,
      payload: error.response.data,
      // payload: {},
    });
  }
};

//==============>Create Profile<=============

// export const createProfile = (newProfile) => async (dispatch, getState) => {
//   // const history = useHistory();
//   const {
//     loginUser: { user },
//   } = getState();
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `${user.token}`,
//     },
//   };
//   axios
//     .post("/api/profile/createuser", newProfile, config)
//     .then((res) => {
//       dispatch({
//         type: PROFILE_CREATE_REQUEST,
//       });
//       dispatch({
//         type: PROFILE_CREATE_SUCCESS,
//         payload: res.data,
//       });
//     })
//     // .then(() => history.push("/dashboard"))
//     // .then(() => dispatch(push("/dashboard")))
//     .catch((error) => {
//       dispatch({
//         type: PROFILE_CREATE_FAIL,
//         payload: error.response.data,
//       });
//     });
// };

export const createProfile = (newProfile) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_CREATE_REQUEST,
    });
    const {
      loginUser: { user },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/profile/createuser",
      newProfile,
      config
    );
    dispatch({
      type: PROFILE_CREATE_SUCCESS,
      payload: data,
    });
    // window.location.replace("/dashboard");
    dispatch({
      type: PROFILE_CREATE_RESET,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: PROFILE_CREATE_FAIL,
      payload: error.response.data,
    });
  }
};

//============>Delete Account<=============
export const deleteAccount = () => async (dispatch, getState) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      dispatch({
        type: DELETE_PROFILE_REQUEST,
      });
      const {
        loginUser: { user },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${user.token}`,
        },
      };
      const { data } = axios.delete("/api/profile/delete_profile", config);
      dispatch({
        type: DELETE_PROFILE_SUCCESS,
        payload: {},
      });
      dispatch(logoutUser());
      //===========>logout user<=============
      // localStorage.removeItem("userToken");
    } catch (error) {
      dispatch({
        type: DELETE_PROFILE_FAIL,
        error: error.response.data,
      });
    }
  }
};

//========>add experience<========
export const addExperience = (expData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_EXPERIENCE_REQUEST,
    });
    const {
      loginUser: { user },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${user.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/profile/experience",
      expData,
      config
    );
    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: error.response.data,
    });
  }
};
