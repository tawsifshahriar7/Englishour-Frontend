import React, { Component } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import { Navigate } from "react-router-dom";

class ProfileUpdate extends Component {
  state = { profileUpdated: false, error: null };
  handlefirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };
  handlelastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };
  handledateOfBirthChange = (e) => {
    this.setState({ dateOfBirth: e.target.value });
  };
  handleinstitutionChange = (e) => {
    this.setState({ institution: e.target.value });
  };
  handleclassChange = (e) => {
    this.setState({ Class: e.target.value });
  };
  handleprofilePictureChange = (e) => {
    this.setState({ profilePicture: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    var cookie = new Cookie();
    const { firstName, lastName, dateOfBirth, institution, Class } = this.state;
    const body = {
      firstName: firstName,
      lastName: lastName,
      dateofBirth: dateOfBirth,
      institution: institution,
      Class: Class,
    };
    axios
      .post("http://localhost:8248/user/updateProfile", body, {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        this.setState({ profileUpdated: true });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.profileUpdated ? <Navigate to="/profile" /> : null}
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Update Profile</h3>
              <div className="form-group mt-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="First name"
                  onChange={this.handlefirstNameChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Last name"
                  onChange={this.handlelastNameChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control mt-1"
                  onChange={this.handledateOfBirthChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Institution</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Institute"
                  onChange={this.handleinstitutionChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Class</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Class"
                  onChange={this.handleclassChange}
                />
              </div>
              {/* <div className="form-group mt-3">
                <label>Profile Picture</label>
                <input
                  type="file"
                  className="form-control mt-1"
                  placeholder="Enter Profile Picture"
                  onChange={this.handleprofilePictureChange}
                />
              </div> */}
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileUpdate;
