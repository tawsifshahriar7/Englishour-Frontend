import React, { Component } from "react";
import LandingPage from "../components/LandingPage/landingPage";
import { Navigate } from "react-router-dom";
import Cookie from "universal-cookie";

class Landing extends Component {
  state = { isLoggedIn: false, profileSelected: false };
  componentDidMount() {
    var cookie = new Cookie();
    if (cookie.get("x-access-token")) {
      this.setState({ isLoggedIn: true });
    }
    if (cookie.get("profile-access-token")) {
      this.setState({ profileSelected: true });
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isLoggedIn && <Navigate to="/selection" />}
        {this.state.profileSelected && <Navigate to="/home" />}
        <LandingPage />
      </React.Fragment>
    );
  }
}

export default Landing;
