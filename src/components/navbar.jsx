import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.png";

class NavBar extends Component {
  state = {
    isLoggedIn: false,
  };
  render() {
    let notifications, profile;
    if (this.state.isLoggedIn) {
      notifications = <Nav.Link href="#notifications">Notifications</Nav.Link>;
      profile = <Nav.Link href="#profile">Profile</Nav.Link>;
    }

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href={this.state.isLoggedIn ? "/home" : "/"}>
            <img
              src={logo}
              width="90"
              height="30"
              className="d-inline-block align-top"
              alt="Englishour logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {notifications}
              {profile}
              <Nav.Link href="#logout">
                {this.state.isLoggedIn ? "Logout" : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
