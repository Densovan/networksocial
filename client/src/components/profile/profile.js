import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getUserProfile } from "../../redux/actions/profileAction";
import ProfileHeader from "./profileHeader";
import ProfileAbout from "./profileAbout";
import ProfileCreds from "./profileCreds";
import ProfileGithub from "./profileGithub";
const Profile = ({ history, match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile(match.params.id));
  }, [dispatch, match]);
  //===========>get user profile api<===========
  const userProfilebyId = useSelector((state) => state.profileUser);
  const { loading, error, profile } = userProfilebyId;
  let profileContent;
  if (profile === null || loading) {
    profileContent = <Spinner />;
  } else {
    if (profile && loading === false) {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link
                to="/profiles"
                className="btn btn-light mt-5 mb-3 float-left"
              >
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
          {/* <ProfileGithub /> */}
        </div>
      );
    }
  }
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-12">{profileContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
