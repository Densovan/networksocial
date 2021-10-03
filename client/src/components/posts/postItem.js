// import React from "react";
// import classnames from "classnames";
// import { Link } from "react-router-dom";

// const PostItem = ({ post }) => {
//   // console.log(post);
//   return (
//     <div className="card card-body mb-3">
//       <div className="row">
//         <div className="col-md-2">
//           <a href="profile.html">
//             <img
//               className="rounded-circle d-none d-md-block"
//               src={post.avatar}
//               alt=""
//             />
//           </a>
//           <br />
//           <p className="text-center">{post.name}</p>
//         </div>
//         <div className="col-md-10">
//           <p className="lead">{post.text}</p>
//           {/* {showActions ? (
//             <span>
//               <button
//                 onClick={this.onLikeClick.bind(this, post._id)}
//                 type="button"
//                 className="btn btn-light mr-1"
//               >
//                 <i
//                   className={classnames("fas fa-thumbs-up", {
//                     "text-info": this.findUserLike(post.likes),
//                   })}
//                 />
//                 <span className="badge badge-light">{post.likes.length}</span>
//               </button>
//               <button
//                 onClick={this.onUnlikeClick.bind(this, post._id)}
//                 type="button"
//                 className="btn btn-light mr-1"
//               >
//                 <i className="text-secondary fas fa-thumbs-down" />
//               </button>
//               <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
//                 Comments
//               </Link>
//               {post.user === auth.user.id ? (
//                 <button
//                   onClick={this.onDeleteClick.bind(this, post._id)}
//                   type="button"
//                   className="btn btn-danger mr-1"
//                 >
//                   <i className="fas fa-times" />
//                 </button>
//               ) : null}
//             </span>
//           ) : null} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostItem;

import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formDate";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  addLike,
  removeLike,
} from "../../redux/actions/postAction";

const PostItem = ({ post, showAction }) => {
  const dispatch = useDispatch();
  //===========>get data from user login<============
  const User = useSelector((state) => state.loginUser);
  const { user: ownUser } = User;

  const PostR = useSelector((state) => state.post);
  const { loading } = PostR;

  const [showActions, setShowAction] = useState(false);
  const { text, name, date, avatar, title, likes, comments, _id, user } = post;
  // console.log(likes);
  useEffect(() => {
    // if (likes.filter((like) => like.user === ownUser.id).length > 0) {
    //   setShowAction(true);
    // }
    // likes.map((like) => {
    //   console.log(like.user, "hello");
    //   console.log(ownUser.id);
    if (likes.user === ownUser.id) {
      setShowAction(!showActions);
    }
    // }
    // );
  }, [ownUser.id, user, likes]);

  const onLikeClick = (id) => {
    dispatch(addLike(id));
  };
  const onClickDelete = (id) => {
    dispatch(deletePost(id));
  };
  const onClickRemvoeLike = (id) => {
    dispatch(removeLike(id));
  };

  // const findUserLike = () => {
  //   // const { auth } = this.props;
  //   if (likes.filter((like) => like.user === ownUser.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <div style={{ marginBottom: "12px" }}>
      <div className="card-style-feeds">
        <Link to={`profile/${user}`}>
          <div className="header-card-style">
            <img className="avatar-card-style" src={avatar} alt={name} />
            <div className="name-card-style">
              <h6>{name}</h6>
              <small className="postOn-style">
                Posted on {formatDate(date)}
              </small>
            </div>
          </div>
        </Link>
        <div className="body-card-style">
          <div>
            <h5>{title}</h5>
          </div>
        </div>
        <hr></hr>
        {/* {showAction ? ( */}
        <div className="bottom-card-style">
          <Button
            onClick={() => onLikeClick(_id)}
            className="btn btn-light me-3"
          >
            <i
              className={
                showActions ? "fas fa-thumbs-up" : " fas fa-thumbs-up text-info"
              }
              // className={classnames("fas fa-thumbs-up", {
              //   "text-info": findUserLike(likes),
              // })}
            />{" "}
            {""}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </Button>
          <Button
            onClick={() => onClickRemvoeLike(_id)}
            className="btn btn-light me-3"
          >
            <i className="fas fa-thumbs-down" />
          </Button>
          <Link to={`/post/${_id}`} className="btn btn-light me-3">
            <i className="far fa-comment"></i> Discuss
          </Link>
          {user === ownUser.id ? (
            <Button
              onClick={() => onClickDelete(_id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </Button>
          ) : null}
        </div>
        {/* ) : null} */}
      </div>
    </div>
  );
};
// PostItem.defaultProps = {
//   showActions: true,
// };

export default PostItem;
