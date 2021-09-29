import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { logoutUser } from "./redux/actions/authAction";
import Dashboard from "./components/dashboard/dashboard";
import Profile from "./components/profile/profile";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/dashboard/createProfile";
import EditProfile from "./components/dashboard/editProfile";
import AddExperience from "./components/dashboard/addCredentails/addExperience";
import AddEducation from "./components/dashboard/addCredentails/addEducation";
import Profiles from "./components/profiles/profiles";
import Posts from "./components/posts/posts";

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
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />

          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/feed" component={Posts} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
