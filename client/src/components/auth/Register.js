import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import axios from "axios";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authAction";

const Register = ({ location, history }) => {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.loginUser);
  const { user } = User;
  const userRegister = useSelector((state) => state.register);
  const { loading, error, reset_register, user_Register } = userRegister;
  // const [state, setState] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   password2: "",
  //   errors: {},
  // });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setError] = useState("");

  // useEffect(() => {
  //   if (user) {
  //     history.push("/login");
  //   }
  // }, [user]);
  // const onChange = (e) => {
  //   // setState({ [e.target.name]: e.target.value });
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      // name: state.name,
      // email: state.email,
      // password: state.password,
      // password2: state.password2,
      name,
      email,
      password,
      password2,
    };
    dispatch(registerUser(newUser));

    // console.log(newUser);

    // axios
    //   .post("/api/user/register", newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => setState({ errors: err.response.data }));
  };
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (error) {
      setError(error);
    }
    if (user) {
      history.push("/dashboard");
    }
    if (user_Register) {
      history.push("/login");
    }
  }, [loading, error]);

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            {/* {loading && <p>loading...</p>}
            {error && <div>{error.name}</div>} */}
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  // className=" form-control form-control-lg"
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.name,
                  })}
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error && <div className="invalid-feedback">{error.name}</div>}
              </div>
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
              <br></br>
              <div className="form-group">
                <input
                  // className="form-control form-control-lg"
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password2,
                  })}
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </div>
              <br></br>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  {loading ? "loading..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default Register;
