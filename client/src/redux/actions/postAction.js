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
import axios from "axios";
//=============>Create post <==================
export const createPost = (postData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
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
      "/api/post/create_post",
      postData,
      config
    );
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CREATE_POST_RESET,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response.data,
    });
  }
};

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_POST_REQUEST,
    });
    const { data } = await axios.get("/api/post/get_posts");
    dispatch({
      type: GET_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error.response.data,
    });
  }
};
