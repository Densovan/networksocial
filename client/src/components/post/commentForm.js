import React, { useEffect, useState } from "react";
import { addComment } from "../../redux/actions/postAction";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const Post = useSelector((state) => state.post);
  const { post, loading, error } = Post;
  const User = useSelector((state) => state.loginUser);
  const { user } = User;
  const [state, setState] = useState({
    text: "",
  });
  const [errors, setError] = useState("");
  const { text } = state;
  //   console.log(text);
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);
  const onSubmit = (e) => {
    e.preventDefault();
    const cmt = {
      text: text,
      name: user.name,
      avatar: user.avatar,
    };
    dispatch(addComment(postId, cmt));
    setState({ text: "" });
    //   text: state.text,
  };
  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Make a comment...</div>
        <div className="card-body">
          <Form onSubmit={onSubmit}>
            {/* <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Reply to post"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />
                      </div> */}
            <Form.Group className="mt-2" controlId="skills">
              <Form.Control
                className={classnames("form-control form-control-lg", {
                  "is-invalid": errors.text,
                })}
                type="name"
                placeholder="Comment on post"
                name="text"
                // defaultValue={skills}
                value={text}
                onChange={(e) =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              ></Form.Control>
              {errors.text && (
                <div className="invalid-feedback">{errors.text}</div>
              )}
            </Form.Group>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
