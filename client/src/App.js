import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { logoutUser } from "./redux/actions/authAction";
import Dashboard from "./components/owner/dashboard";
import Profile from "./components/owner/profileAction";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/owner/createProfile";

//Check for token
if (localStorage.userToken) {
  //Set auth token header auth
  setAuthToken(localStorage.userToken);
  //Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.userToken);
  // set user and isAuthenticated
  // store.dispatch(setCurrentUser(decoded));
  // console.log("decode", decoded);
  //check for expired token
  const currentTime = Date.now() / 1000;
  // console.log(currentTime, decoded.exp);
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    // TODO: clear current profile
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  // store.dispatch(s)
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
