import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import classnames from "classnames";
import { Button } from "react-bootstrap";
// import axios from "axios";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.loginUser);
  const { loading, user, error } = User;
  // const [state, setState] = useState({
  //   email: "",
  //   password: "",
  //   // errors: {},
  // });
  // const onChange = (e) => {
  //   // setState({ [e.target.name]: e.target.value });
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    dispatch(loginUser(newUser));
    // console.log(newUser);
    // axios
    //   .post("/api/user/login", newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (error) {
      setError(error);
    }
    if (user) {
      history.push("/dashboard");
    }
  }, [error, user, history]);
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign In</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <br></br>
                <input
                  type="email"
                  // className="form-control form-control-lg"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.email,
                  })}
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                <small className="form-text text-muted">
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  // className="form-control form-control-lg"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  {loading ? "loading..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
