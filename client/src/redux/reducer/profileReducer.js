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
        ...state,
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
