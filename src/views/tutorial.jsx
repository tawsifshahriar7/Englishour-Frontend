import React, { Component } from "react";
import axios from "axios";
import Cookie from "universal-cookie";

class Tutorial extends Component {
  state = { tutorialData: null };
  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get("http://localhost:8248/user/getTutorial?topic_id=1", {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        this.setState({ tutorialData: res.data[0].content });
        console.log(this.state.tutorialData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <h4>Tutorial</h4>
        <p>{this.state.tutorialData}</p>
      </div>
    );
  }
}

export default Tutorial;
