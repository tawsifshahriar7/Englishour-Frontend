import React, { Component } from "react";
import "../styles/profileSelection.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

class Selection extends Component {
  state = { selectedProfile: null, list: [] };

  loadProfiles = async () => {
    axios
      .get(
        "http://localhost:8248/user/getProfiles?username=" +
          localStorage.getItem("user")
      )
      .then((res) => {
        this.setState({ list: res.data });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.loadProfiles();
  }

  handleSelection = (e) => {
    this.setState({
      selectedProfile: e.target.id,
    });
    console.log(e.target.id);
    localStorage.setItem("profile", e.target.id);
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
      <React.Fragment>
        {this.state.selectedProfile && (
          <Navigate to="/profile" replace={true} />
        )}
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
    );
  }
}

export default Selection;
