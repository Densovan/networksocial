import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //===========>get data from user login<============
  const User = useSelector((state) => state.loginUser);
  const { user } = User;
  const isLogin = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
