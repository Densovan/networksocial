// import React, { useEffect } from "react";
// import { getPosts } from "../../redux/actions/postAction";
// import { useDispatch, useSelector } from "react-redux";
// import Spinner from "../common/Spinner";
// import PostFeed from "./postFeed";
// import PostForm from "./postForm";

// const Posts = () => {
//   const dispatch = useDispatch();

//   const getAllposts = useSelector((state) => state.getPosts);
//   const { loading, error, posts } = getAllposts;

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [getPosts]);

//   let postContent;

//   if (posts === null || loading) {
//     postContent = <Spinner />;
//   } else {
//     // postContent = <PostFeed posts={posts} />;
//     if (posts && loading === false) {
//       postContent = <PostFeed posts={posts} />;
//       // console.log(posts, "post");
//     }
//   }
//   return (
//     <div className="feed">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <PostForm />
//             {postContent}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Posts;

import React, { useEffect } from "react";
import { getPosts } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import PostFeed from "./postFeed";
import PostForm from "./postForm";
import Loader from "../common/loader";

const Posts = () => {
  const dispatch = useDispatch();

  const getAllposts = useSelector((state) => state.post);
  const { loading, error, posts } = getAllposts;

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts]);
  // if (posts === null || loading) {
  //   console.log("loading");
  // } else {
  // }
  // console.log(posts, "test");

  let postContent;

  if (loading) {
    postContent = <Loader />;
  } else {
    if (posts && loading === false) {
      postContent = <PostFeed posts={posts} />;
      // console.log(posts, "post");
    }
  }
  return (
    <div className="feed">
      {/* <div className="container"> */}
      <div className="row">
        <div className="col-md-12">
          {/* <PostForm /> */}
          {postContent}
          {/* <PostFeed posts={posts} /> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Posts;
