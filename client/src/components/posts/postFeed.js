import React from "react";
import PostItem from "./postItem";
import PropTypes from "prop-types";

const PostFeed = ({ posts }) => {
  return posts.map((post) => <PostItem key={post._id} post={post} />);
  // return (
  //   <div>
  //     {/* {posts.map((res) => (
  //       <div>{res.text}</div>
  //     ))} */}
  //     <h1>hello</h1>
  //   </div>
  // );
};
PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostFeed;
