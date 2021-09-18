import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  deleteAccount,
} from "../../redux/actions/profileAction";
import { logoutUser } from "../../redux/actions/authAction";
import Spinner from "../common/Spinner";
import ProfileAction from "./profileAction";
import { Button } from "react-bootstrap";
import store from "../../store";
const Profile = ({ history }) => {
  // const [profile, setProfile] = useState({});
  // const [name, setName] = useState("");
  const dispatch = useDispatch();
  //===========>get user profile api<===========
  const userProfile = useSelector((state) => state.currerntUser);
  const { loading, error, profile } = userProfile;
  //===========>get data from user login<============
  const User = useSelector((state) => state.loginUser);
  const { user } = User;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [user, dispatch]);

  //=========>delete accoutn<==========
  const onDeleteClick = () => {
    dispatch(deleteAccount());
    // dispatch(logoutUser());
  };

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    // Check if logged in user has profile data
    if (profile) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
          </p>
          <ProfileAction />
          {/*TODO exp and edu*/}
          <div style={{ marginBottom: "60px" }}>
            <Button className="btn btn-danger" onClick={onDeleteClick}>
              Delete My Account
            </Button>
          </div>
        </div>
      );
    } else {
      // User is logged in but has no profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <div className="d-grid gap-2">
            <Link to="/create-profile" className="btn btn-lg btn-primary">
              Create Profile
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
