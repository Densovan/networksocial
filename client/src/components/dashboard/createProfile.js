import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../redux/actions/profileAction";
import FormContainer from "../common/formContainer";
import classnames from "classnames";
import { PROFILE_CREATE_RESET } from "../../redux/constants/profileContant";

const CreateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const profileCreate = useSelector((state) => state.createProfile);
  const { success, error, loading } = profileCreate;
  //===========>get user profile api<===========
  const userProfile = useSelector((state) => state.currerntUser);
  const { loading: loadingProfile, error: errorProfile, profile } = userProfile;

  const [displaySocailInputs, setDisplaySocailInput] = useState(false);
  const [handle, setHandle] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [errors, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      instagram,
      youtube,
    };
    dispatch(createProfile(newProfile));
    // if (newProfile) {
    //   window.location.replace("/dashboard");
    // }
  };
  useEffect(() => {
    if (success) {
      dispatch({ type: PROFILE_CREATE_RESET });
      history.push("/dashboard");
    }
    if (error) {
      setError(error);
    }
    if (profile) {
      history.push("/edit-profile");
    }
  }, [error, loading]);

  // Select options for status
  const options = [
    { label: "* Select Professional Status", value: 0 },
    { label: "Developer", value: "Developer" },
    { label: "Junior Developer", value: "Junior Developer" },
    { label: "Senior Developer", value: "Senior Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student or Learning", value: "Student or Learning" },
    { label: "Instructor or Teacher", value: "Instructor or Teacher" },
    { label: "Intern", value: "Intern" },
    { label: "Other", value: "Other" },
  ];

  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  //================>Social input<===============
  let socialInputs;
  if (displaySocailInputs) {
    socialInputs = (
      <div>
        <Form.Group className="mt-2" controlId="twitter">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Twitter
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text className="fab fa-twitter"></InputGroup.Text>
            <Form.Control
              name="twitter"
              id="inlineFormInputGroup"
              placeholder="Twitter Profile URL"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-2" controlId="facebook">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Facebook
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text className="fab fa-facebook"></InputGroup.Text>
            <Form.Control
              name="facebook"
              id="inlineFormInputGroup"
              placeholder="Facebook Page URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-2" controlId="linkedin">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Linkedin
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text className="fab fa-linkedin"></InputGroup.Text>
            <Form.Control
              name="linkedin"
              id="inlineFormInputGroup"
              placeholder="Linkedin Profile URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-2" controlId="youtube">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Youtube
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text className="fab fa-youtube"></InputGroup.Text>
            <Form.Control
              name="youtube"
              id="inlineFormInputGroup"
              placeholder="YouTube Channel URL"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mt-2" controlId="instagram">
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            Instagram
          </Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Text className="fab fa-instagram"></InputGroup.Text>
            <Form.Control
              name="instagram"
              id="inlineFormInputGroup"
              placeholder="Instagram Page URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </div>
    );
  }
  return (
    <div className="create-profile">
      <div className="container">
        <Row>
          <Col md={8} className="m-auto">
            <h1 className="display-4 text-center mt-5">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>

            {/* <FormContainer> */}
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="handle">
                <Form.Label>Handle Name</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.handle,
                  })}
                  type="name"
                  placeholder="* Profile Handle"
                  name="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                ></Form.Control>
                {errors.handle && (
                  <div className="invalid-feedback">{errors.handle}</div>
                )}
                <small className="form-text text-muted">
                  A unique handle for your profile URL. Your full name, company
                  name, nickname
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.status,
                  })}
                  type="name"
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {selectOptions}
                </Form.Select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
                <small className="form-text text-muted">
                  Give us an idea of where you are at in your career
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                ></Form.Control>
                <small className="form-text text-muted">
                  Could be your own company or one you work for
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                ></Form.Control>
                <small className="form-text text-muted">
                  Could be your own website or a company one
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></Form.Control>
                <small className="form-text text-muted">
                  City or city & state suggested (eg. Boston, MA)
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="skills">
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.skills,
                  })}
                  type="name"
                  placeholder="Skills"
                  name="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                ></Form.Control>
                {errors.skills && (
                  <div className="invalid-feedback">{errors.skills}</div>
                )}
                <small className="form-text text-muted">
                  Please use comma separated values (eg. HTML,CSS,JavaScript,PHP
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="github username">
                <Form.Label>Github Username</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={(e) => setGithubusername(e.target.value)}
                ></Form.Control>
                <small className="form-text text-muted">
                  If you want your latest repos and a Github link, include your
                  username
                </small>
              </Form.Group>
              <Form.Group className="mt-2" controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  type="name"
                  placeholder="Short Bio"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></Form.Control>
                <small className="form-text text-muted">
                  Tell us a little about yourself
                </small>
              </Form.Group>
              <div className="mb-3">
                <Button
                  type="button"
                  onClick={() => setDisplaySocailInput(!displaySocailInputs)}
                  className="btn btn-light me-2"
                >
                  Add Social Network Links
                </Button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <div className="d-grid gap-2">
                <Button type="submit" className="btn btn-primary btn-block">
                  {loading ? "loading..." : "Create"}
                </Button>
                {/* <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                /> */}
              </div>
            </Form>
            {/* </FormContainer> */}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CreateProfile;
