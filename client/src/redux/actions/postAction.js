import axios from "axios";
import {
  ADD_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  ADD_COMMENT,
  DELETE_POST,
  REMOVE_COMMENT,
  UPDATE_LIKES,
  POST_LOADING,
} from "../constants/postConstans.js";

//=============get posts ==============
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

//==============get post ===============
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/post/get_post/${id}`);
    dispatch({
      type: POST_LOADING,
    });
    dispatch({
      type: GET_POST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};
//=============delete post============
export const deletePost = (id) => async (dispatch, getState) => {
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
    await axios.delete(`api/post/delete_post/${id}`, config);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//============add comment =================
export const addComment = (postId, formData) => async (dispatch, getState) => {
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
      `/api/post/comment_post/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//===============delete comment ============
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/delete_comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};
//=============add like ==============
export const addLike = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.post(`/api/post/like_post/${id}`, {}, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: data },
    });
    dispatch(getPosts());
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};
//============remove like============
export const removeLike = (id) => async (dispatch, getState) => {
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
      `/api/post/unlike_post/${id}`,
      {},
      config
    );
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: data },
    });
    dispatch(getPosts());
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
