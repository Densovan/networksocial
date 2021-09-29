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
  //==========>Add experience <===========
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  //================> Add Education<===============
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_REQUEST,
  ADD_EDUCATION_SUCCESS,
  //=========> Delete Experienc<=============
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
  //===============> Delete Education<===========
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL,
  //=============> GET all user profile <=========
  GET_ALL_PROFILE_USERS_FAIL,
  GET_ALL_PROFILE_USERS_REQUEST,
  GET_ALL_PROFILE_USERS_SUCCESS,
  //==============> Get user profile by Id <==============
  GET_PROFILE_USER_FAIL,
  GET_PROFILE_USER_SUCCESS,
  GET_PROFILE_USER_REQUEST,
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

//========>add education<========
export const addEducation = (eduData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_EDUCATION_REQUEST,
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
      "/api/profile/education",
      eduData,
      config
    );
    dispatch({
      type: ADD_EDUCATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EDUCATION_FAIL,
      payload: error.response.data,
    });
  }
};

//============>Delete Experience<=============
export const deleteExperience = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_EXPERIENCE_REQUEST,
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
    const { data } = await axios.delete(
      `/api/profile/delete_experience/${id}`,
      config
    );
    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
    });
    dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: data,
    });
    //===========>logout user<=============
    // localStorage.removeItem("userToken");
  } catch (error) {
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      error: error.response.data,
    });
  }
};

//============>Delete Experience<=============
export const deleteEducation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_EDUCATION_REQUEST,
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
    const { data } = await axios.delete(
      `/api/profile/delete_education/${id}`,
      config
    );
    dispatch({
      type: DELETE_EDUCATION_SUCCESS,
    });
    dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: data,
    });
    //===========>logout user<=============
    // localStorage.removeItem("userToken");
  } catch (error) {
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      error: error.response.data,
    });
  }
};

//==================>Get all Profile user<============

export const getAllUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_PROFILE_USERS_REQUEST,
    });
    const { data } = await axios.get("/api/profile/all");
    dispatch({
      type: GET_ALL_PROFILE_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROFILE_USERS_FAIL,
      payload: error.response.data,
    });
  }
};

//==============>get user profile by Id<====================
export const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_USER_REQUEST,
    });
    const { data } = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_USER_FAIL,
      payload: error.response.data,
    });
  }
};
