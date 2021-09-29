import React, { useEffect } from "react";
import { getPosts } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import PostFeed from "./postFeed";
import PostForm from "./postForm";

const Posts = () => {
  const dispatch = useDispatch();

  const getAllposts = useSelector((state) => state.getPosts);
  const { loading, error, posts } = getAllposts;

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    // postContent = <PostFeed posts={posts} />;
    if (posts && loading === false) {
      postContent = <h1>hello</h1>;
      console.log(posts);
    }
  }
  return (
    <div className="feed">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
