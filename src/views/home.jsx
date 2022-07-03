import React, { Component } from "react";
import NavBar from "../components/navbar";

class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h1>Home</h1> 
      </React.Fragment>
    );
  }
}

export default Home;
