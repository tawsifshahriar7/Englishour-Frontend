import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Logout extends Component {
  state = {};
  componentDidMount() {
    localStorage.clear();
  }
  render() {
    return <Navigate to="/" />;
  }
}

export default Logout;
