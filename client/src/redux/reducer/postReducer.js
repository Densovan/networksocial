import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
} from "../constants/postConstans";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST: {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    }
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
