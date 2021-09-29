import {
  //========>Create Post <=======
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_RESET,
  CREATE_POST_SUCCESS,
  //=========> GET post<===========
  GET_POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
} from "../constants/postConstans";

//=========> create post reducer <=============
export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        loading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        post: action.payload,
      };
    case CREATE_POST_RESET:
      return {
        loading: false,
        post: action.payload,
      };
    case CREATE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        loading: true,
      };
    case GET_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
      };

    case GET_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
