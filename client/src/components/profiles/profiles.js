import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserProfile } from "../../redux/actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileItem from "./profileItem";
const Profiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserProfile());
  }, []);
  const getAllProfiles = useSelector((state) => state.allProfileUser);
  const { loading, error, profiles } = getAllProfiles;
  //   console.log(profiles);
  let profileItems;
  if (profiles === null || loading) {
    profileItems = <Spinner />;
  } else {
    if (profiles.length > 0) {
      profileItems = profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = <h1>No Profile found...</h1>;
    }
  }
  return (
    <div className="profile">
      <div className="container">
        <Row>
          <Col md={12}>
            <h1 className="display-4 text-center mt-5">Developer Profile</h1>
            <p className="lead text-center">
              Browse and connect with developers
            </p>
            {profileItems}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profiles;
