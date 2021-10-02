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

import React, { useState, Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formDate";
import Topics from "./topics";

const PostItem = ({ post }) => {
  const [showActions, setShowAction] = useState(true);
  const { text, name, date, avatar, title } = post;
  return (
    <div style={{ marginBottom: "12px" }}>
      <div className="card-style-feeds">
        <div className="header-card-style">
          <img className="avatar-card-style" src={avatar} alt={name} />
          <div className="name-card-style">
            <h6>{name}</h6>
            <small className="postOn-style">Posted on {formatDate(date)}</small>
          </div>
        </div>
        <div className="body-card-style">
          <div>
            <h5>{title}</h5>
          </div>
        </div>
        <hr></hr>
        <div className="bottom-card-style">
          <Button to="/edit-profile" className="btn btn-light me-3">
            {/* <i className="fas fa-user-circle text-info mr-1" /> */}
            <i className="fas fa-thumbs-up text-info mr-1 mr-1" /> 8
            {/* <span>8</span> */}
          </Button>
          <Button to="/add-experience" className="btn btn-light me-3">
            {/* <i className="fab fa-black-tie text-info mr-1" /> */}
            <i className="fas fa-thumbs-down" />
            {/* Add Experience */}
          </Button>
          <Button to="/add-experience" className="btn btn-light me-3">
            <i className="far fa-comment"></i> Discuss
          </Button>
        </div>
      </div>
    </div>
  );
};
// PostItem.defaultProps = {
//   showActions: true,
// };

export default PostItem;
