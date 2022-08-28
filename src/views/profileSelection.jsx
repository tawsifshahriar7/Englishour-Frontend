import React, { Component } from "react";
import "../styles/profileSelection.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";
import Background from "../img/simple_bg.jpg";

class Selection extends Component {
  state = { selectedProfile: null, list: [] };

  loadProfiles = async () => {
    var cookie = new Cookie();
    console.log(cookie.get("x-access-token"));
    axios
      .get("http://localhost:8248/user/getProfiles", {
        headers: { "x-access-token": cookie.get("x-access-token") },
      })
      .then((res) => {
        this.setState({ list: res.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.loadProfiles();
  }

  handleSelection = (e) => {
    var cookie = new Cookie();
    this.setState({
      selectedProfile: e.target.id,
    });
    // console.log(e.target.id);
    // localStorage.setItem("profile", e.target.id);
    axios
      .get(
        "http://localhost:8248/user/selectProfile?profile_id=" + e.target.id,
        { headers: { "x-access-token": cookie.get("x-access-token") } }
      )
      .then((res) => {
        console.log(res.data);
        cookie.set("profile-access-token", res.data, { path: "/" });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const listItems = this.state.list.map((item, index) => (
      <div className="profile-selection-container" key={index}>
        <button
          type="button"
          class="btn btn-primary profile-btn"
          id={item.profile_id}
          onClick={this.handleSelection}
        >
          {item.first_name + " " + item.last_name}
        </button>
        <br />
        <br />
      </div>
    ));

    return (
      <div
        style={{
          background: `url(${Background})`,
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
      <React.Fragment>
        {this.state.selectedProfile && <Navigate to="/home" replace={true} />}
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3>Select Profile</h3>
        </div>
        <div className="parent">
          <div class="btn-group-vertical">{listItems}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/createprofile">
            <button type="button" class="btn btn-secondary">
              Create Profile
            </button>
          </Link>
        </div>
      </React.Fragment>
      </div>
    );
  }
}

export default Selection;
