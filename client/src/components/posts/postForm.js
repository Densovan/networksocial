// import React, { useState, useEffect } from "react";
// import TextEditor from "../common/textEditor";
// import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
// import { createPost } from "../../redux/actions/postAction";
// import { useDispatch, useSelector } from "react-redux";
// import classnames from "classnames";
// import {
//   CREATE_POST_RESET,
//   GET_POST_SUCCESS,
// } from "../../redux/constants/postConstans";
// import ImgCrop from "antd-img-crop";
// import axios from "axios";
// const PostForm = ({ history, match }) => {
//   const dispatch = useDispatch();
//   //===========>get data from user login<============
//   const User = useSelector((state) => state.loginUser);
//   const { user } = User;
//   const postCreate = useSelector((state) => state.createPost);
//   const { success, error, loading } = postCreate;
//   const [text, setText] = useState("");
//   const [title, setTitle] = useState("");
//   const [errors, setError] = useState("");
//   const [thumnail, setThumnail] = useState("");
//   const [uploading, setUploading] = useState(false);
//   useEffect(() => {
//     // if (success) {
//     // dispatch({ type: CREATE_POST_RESET });
//     // window.location.replace("/feed");
//     // dispatch({ type: GET_POST_SUCCESS });
//     // }

//     if (error) {
//       setError(error);
//     }
//   }, [error, loading]);
//   const handleTextChange = (value) => {
//     setText(value);
//   };
//   const onSubmit = (e) => {
//     e.preventDefault();
//     const newPost = {
//       text: text,
//       name: user.name,
//       avatar: user.avatar,
//       thumnail: thumnail,
//       title: title,
//     };
//     dispatch(createPost(newPost));
//   };

//   const uploadFileHandler = async (e) => {
//     e.preventDefault();
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);
//     setUploading(true);

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/upload",
//         // "http://localhost:9000/upload/images",
//         formData,
//         config
//       );

//       setThumnail(data);
//       setUploading(false);
//     } catch (error) {
//       console.error(error);
//       setUploading(false);
//     }
//   };
//   return (
//     // <div>

//     //   <TextEditor handleDescChange={handleTextChange} defaultValue={text} />
//     // </div>

//     <div className="post-form mt-3 mb-3">
//       <div className="card card-info">
//         <div className="card-header bg-info text-white">Say Somthing...</div>
//         <div className="card-body">
//           <Form onSubmit={onSubmit}>
//             <div className="form-group">
//               <Form.Group controlId="title">
//                 <Form.Label>Title</Form.Label>
//                 <Form.Control
//                   className={classnames("form-control form-control-lg", {
//                     "is-invalid": errors.title,
//                   })}
//                   type="name"
//                   placeholder="* Input Title"
//                   name="title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 ></Form.Control>
//                 {errors.title && (
//                   <div className="invalid-feedback">{errors.title}</div>
//                 )}
//               </Form.Group>
//               <Form.Group controlId="formFile">
//                 <Form.Label>Thumnail</Form.Label>
//                 {/* <Form.Control
//                   type="text"
//                   placeholder="Enter Image url"
//                   value={thumnail}
//                   onChange={(e) => setThumnail(e.target.value)}
//                 ></Form.Control> */}
//                 <Form.Control
//                   id="image-file"
//                   type="file"
//                   label="Choose File"
//                   custom
//                   onChange={uploadFileHandler}
//                 ></Form.Control>

//                 {uploading && "loading...."}
//               </Form.Group>
//               <div
//                 className={classnames("form-control form-control-lg mt-3", {
//                   "is-invalid": errors.text,
//                 })}
//               >
//                 <TextEditor
//                   handleDescChange={handleTextChange}
//                   defaultValue={text}
//                 />
//               </div>
//               {errors.text && (
//                 <div className="invalid-feedback">{errors.text}</div>
//               )}
//             </div>
//             <div className="d-grid gap-2 mt-3">
//               <Button type="submit" className="btn btn-primary btn-block">
//                 {loading ? "loading..." : "Post"}
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostForm;

import React, { useState, useEffect } from "react";
import TextEditor from "../common/textEditor";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { addPost } from "../../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import {
  CREATE_POST_RESET,
  GET_POST_SUCCESS,
} from "../../redux/constants/postConstans";
import ImgCrop from "antd-img-crop";
import axios from "axios";
const PostForm = ({ history, match }) => {
  const dispatch = useDispatch();
  //===========>get data from user login<============
  const User = useSelector((state) => state.loginUser);
  const { user } = User;
  const postCreate = useSelector((state) => state.post);
  const { success, error, loading } = postCreate;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setError] = useState("");
  const [thumnail, setThumnail] = useState("");
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    // if (success) {
    // dispatch({ type: CREATE_POST_RESET });
    // window.location.replace("/feed");
    // dispatch({ type: GET_POST_SUCCESS });
    // }

    if (error) {
      setError(error);
    }
  }, [error, loading]);
  const handleTextChange = (value) => {
    setText(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      text: text,
      name: user.name,
      avatar: user.avatar,
      thumnail: thumnail,
      title: title,
    };
    dispatch(addPost(newPost));
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload",
        // "http://localhost:9000/upload/images",
        formData,
        config
      );

      setThumnail(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  return (
    // <div>

    //   <TextEditor handleDescChange={handleTextChange} defaultValue={text} />
    // </div>

    <div className="post-form mt-3 mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Somthing...</div>
        <div className="card-body">
          <Form onSubmit={onSubmit}>
            <div className="form-group">
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.title,
                  })}
                  type="name"
                  placeholder="* Input Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </Form.Group>
              <Form.Group controlId="formFile">
                <Form.Label>Thumnail</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter Image url"
                  value={thumnail}
                  onChange={(e) => setThumnail(e.target.value)}
                ></Form.Control> */}
                <Form.Control
                  id="image-file"
                  type="file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}
                ></Form.Control>

                {uploading && "loading...."}
              </Form.Group>
              <div
                className={classnames("form-control form-control-lg mt-3", {
                  "is-invalid": errors.text,
                })}
              >
                <TextEditor
                  handleDescChange={handleTextChange}
                  defaultValue={text}
                />
              </div>
              {errors.text && (
                <div className="invalid-feedback">{errors.text}</div>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <Button type="submit" className="btn btn-primary btn-block">
                {loading ? "loading..." : "Post"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
