import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "universal-cookie";

class Logout extends Component {
  state = {};
  componentDidMount() {
    var cookie = new Cookie();
    cookie.remove("x-access-token");
    cookie.remove("profile-access-token");
  }
  render() {
    return <Navigate to="/" />;
  }
}

export default Logout;
