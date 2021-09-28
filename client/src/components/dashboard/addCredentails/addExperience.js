import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { addExperience } from "../../../redux/actions/profileAction";
import Message from "../../alertMessage/Message";
import classnames from "classnames";
import { ADD_EXPERIENCE_RESET } from "../../../redux/constants/profileContant";
import toast, { Toaster } from "react-hot-toast";
const AddExperience = ({ history }) => {
  const dispatch = useDispatch();
  const addExperienceuser = useSelector((state) => state.addUserExperience);
  const { loading, success, error } = addExperienceuser;
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [errors, setError] = useState("");
  const [message, setMessage] = useState("");
  const { company, title, location, from, to, current, description } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperience(formData));
  };
  useEffect(() => {
    if (success && loading === false) {
      setTimeout(function () {
        dispatch({
          type: ADD_EXPERIENCE_RESET,
        });
        history.push("/dashboard");
      }, 3000);
    }
    if (error) {
      setError(error);
    }
  }, [error, success, loading]);
  // const notify = () => toast.success("Created Successfully");
  return (
    <div className="add-experience">
      <div className="container">
        <center>{success && toast.success("Created Successfully")}</center>
        <Toaster />
        <Row>
          <Col md={8} className="m-auto">
            <h1 className="large text-primary mt-5">Add An Experience</h1>
            <p className="lead">
              <i className="fas fa-code-branch" /> Add any developer/programming
              positions that you have had in the past
            </p>
            <small>* = required field</small>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.title,
                  })}
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={onChange}
                ></Form.Control>
                {errors.title && (
                  <div className="invalid-feedback">{errors.title}</div>
                )}
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.company,
                  })}
                  type="text"
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={onChange}
                ></Form.Control>
                {errors.company && (
                  <div className="invalid-feedback">{errors.company}</div>
                )}
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.location,
                  })}
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={onChange}
                ></Form.Control>
                {errors.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.from,
                  })}
                  // className="form-control form-control-lg"
                  type="date"
                  placeholder="Date"
                  name="from"
                  value={from}
                  onChange={onChange}
                ></Form.Control>
                {errors.from && (
                  <div className="invalid-feedback">{errors.from}</div>
                )}
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  className="form-control form-control-lg"
                  type="date"
                  placeholder="Date"
                  name="to"
                  value={to}
                  onChange={onChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>Current Job</Form.Label>
                <Form.Control
                  className="form-check-input"
                  type="checkbox"
                  placeholder="Current Job"
                  name="current"
                  value={current}
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  type="text"
                  as="textarea"
                  placeholder="Job Description"
                  name="description"
                  value={description}
                  onChange={onChange}
                ></Form.Control>
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </Form.Group>
              <Form.Group>
                <div className="d-grid gap-2 mt-4">
                  <Button type="submit" className="btn btn-primary btn-block">
                    {loading ? "loading..." : "Create"}
                    {/* Submit */}
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddExperience;
