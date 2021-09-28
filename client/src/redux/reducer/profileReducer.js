import {
  //=================>Get current user<=================
  CURRENT_USER_FAIL,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_RESET,
  //==================> Create profile user<============
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
  PROFILE_CREATE_RESET,
  //=============>Add experience user<===========
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_RESET,
  //============> Add education user<===========
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_REQUEST,
  ADD_EDUCATION_RESET,
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

//=============>Get current user reducer<==============
export const currenUserReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case CURRENT_USER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CURRENT_USER_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
      };
    case CURRENT_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CURRENT_USER_RESET:
      return { profile: {} };
    default:
      return state;
  }
};

//===========>create profile Reducer<==========
export const createProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PROFILE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        profile: action.payload,
      };

    case PROFILE_CREATE_RESET:
      return {
        loading: false,
        profile: action.payload,
      };
    case PROFILE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

//===========>add experince reducer<===============

export const addExperienceReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EXPERIENCE_REQUEST:
      return {
        loading: true,
        // ...state,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        loading: false,
        success: true,
        experience: action.payload,
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_EXPERIENCE_RESET:
      return { loading: false, experience: action.payload };
    default:
      return state;
  }
};

//===========>add education reducer<===============

export const addEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EDUCATION_REQUEST:
      return {
        loading: true,
        // ...state,
      };
    case ADD_EDUCATION_SUCCESS:
      return {
        loading: false,
        success: true,
        education: action.payload,
      };
    case ADD_EDUCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADD_EDUCATION_RESET:
      return { loading: false, education: action.payload };
    default:
      return state;
  }
};

export const experienceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPERIENCE_REQUEST:
      return { loading: true };
    case DELETE_EXPERIENCE_SUCCESS:
      return { loading: false, success: true };
    case CURRENT_USER_SUCCESS:
      return { loading: false, profile: action.payload };
    case DELETE_EXPERIENCE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const educationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EDUCATION_REQUEST:
      return { loading: true };
    case DELETE_EDUCATION_SUCCESS:
      return { loading: false, success: true };
    case CURRENT_USER_SUCCESS:
      return { loading: false, profile: action.payload };
    case DELETE_EDUCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllProfileUserReducer = (state = { profiles: {} }, action) => {
  switch (action.type) {
    case GET_ALL_PROFILE_USERS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_ALL_PROFILE_USERS_SUCCESS:
      return {
        loading: false,
        profiles: action.payload,
      };
    case GET_ALL_PROFILE_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProfileUserReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_PROFILE_USER_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_PROFILE_USER_SUCCESS:
      return {
        loading: false,
        profiles: action.payload,
      };
    case GET_PROFILE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
