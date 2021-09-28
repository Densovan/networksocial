import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { addEducation } from "../../../redux/actions/profileAction";
import classnames from "classnames";
import { ADD_EDUCATION_RESET } from "../../../redux/constants/profileContant";
import toast, { Toaster } from "react-hot-toast";
const AddEducation = ({ history }) => {
  const dispatch = useDispatch();
  const addEducationuser = useSelector((state) => state.addUserEducation);
  const { success, error, loading } = addEducationuser;
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [errors, setError] = useState("");
  const { degree, school, fieldofstudy, from, to, current, description } =
    formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(addEducation(formData));
  };
  useEffect(() => {
    if (success) {
      setTimeout(function () {
        dispatch({
          type: ADD_EDUCATION_RESET,
        });
        history.push("/dashboard");
      }, 3000);
    }
    if (error) {
      setError(error);
    }
  }, [error, loading, success]);
  // const notify = () => toast.success("Created Successfully");
  return (
    <div className="add-experience">
      <div className="container">
        <center>{success && toast.success("Created Successfully")}</center>
        <Toaster />
        <Row>
          <Col md={8} className="m-auto">
            <h1 className="large text-primary mt-5">Add An Education</h1>
            <p className="lead">
              <i className="fas fa-code-branch" /> Add any developer/programming
              positions that you have had in the past
            </p>
            <small>* = required field</small>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mt-2" controlId="school">
                <Form.Label>School</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.school,
                  })}
                  type="text"
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={onChange}
                ></Form.Control>
                {errors.school && (
                  <div className="invalid-feedback">{errors.school}</div>
                )}
              </Form.Group>
              <Form.Group className="mt-2" controlId="degree">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.degree,
                  })}
                  type="text"
                  placeholder="* Degree"
                  name="degree"
                  value={degree}
                  onChange={onChange}
                ></Form.Control>
                {errors.degree && (
                  <div className="invalid-feedback">{errors.degree}</div>
                )}
              </Form.Group>
              <Form.Group className="mt-2" controlId="fieldofstudy">
                <Form.Label>Field of Study</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.fieldofstudy,
                  })}
                  type="text"
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={onChange}
                ></Form.Control>
                {errors.fieldofstudy && (
                  <div className="invalid-feedback">{errors.fieldofstudy}</div>
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
                <Form.Label>Education Description</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  as="textarea"
                  type="textarea"
                  placeholder="Education Description"
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

export default AddEducation;
