import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import PostItem from "../posts/postItem";
import Loader from "../common/loader";
import CommentForm from "./commentForm";

const Post = ({ history, match }) => {
  const dispatch = useDispatch();

  const Post = useSelector((state) => state.post);
  const { post, loading } = Post;

  useEffect(() => {
    dispatch(getPost(match.params.id));
  }, [loading, dispatch]);
  let postContent;

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Loader />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        {/* <CommentFeed postId={post._id} comments={post.comments} /> */}
      </div>
    );
  }
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
