import axios from "axios";
import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
} from "../constants/postConstans.js";

//=============get post ==============
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/post/get_posts");
    dispatch({
      type: GET_POSTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//=============add post==============
export const addPost = (postData) => async (dispatch, getState) => {
  try {
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
      "/api/post/create_post",
      postData,
      config
    );
    dispatch({
      type: ADD_POST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};
