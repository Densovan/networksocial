import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";

const Header = () => {
  const User = useSelector((state) => state.loginUser);
  const { user } = User;
  const dispatch = useDispatch();
  const onLogoutClick = () => {
    // e.preventDefault();
    dispatch(logoutUser());
  };
  // console.log("dhh", user);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/dashboard">DevConnector</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Developer</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {user ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <div className="nav-link">
                    <img
                      className="rounded-circle"
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: "25px", marginRight: "5px" }}
                      title="You must have a Gravatar connected to your email to display an image"
                    />
                    <span onClick={onLogoutClick} className="ms-2">
                      Logout
                    </span>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <React.Fragment>
    //   <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    //     <div className="container">
    //       <Link to="/profile" className="navbar-brand" href="landing.html">
    //         DevConnector
    //       </Link>
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#mobile-nav"
    //       >
    //         <span className="navbar-toggler-icon" />
    //       </button>

    //       <div className="collapse navbar-collapse" id="mobile-nav">
    //         <ul className="navbar-nav mr-auto">
    //           <li className="nav-item">
    //             <a className="nav-link" href="profiles.html">
    //               {" "}
    //               Developers
    //             </a>
    //           </li>
    //         </ul>
    // {user ? (
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <a onClick={onLogoutClick} className="nav-link">
    //         <img
    //           className="rounded-circle"
    //           src={user.avatar}
    //           alt={user.name}
    //           style={{ width: "25px", marginRight: "5px" }}
    //           title="You must have a Gravatar connected to your email to display an image"
    //         />{" "}
    //         Logout
    //       </a>
    //     </li>
    //   </ul>
    // ) : (
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/register">
    //         Sign Up
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/login">
    //         Login
    //       </Link>
    //     </li>
    //   </ul>
    // )}

    //         {/* {user === null || undefined ? guestLinks : authLinks} */}
    //       </div>
    //     </div>
    //   </nav>
    // </React.Fragment>
  );
};

export default Header;
