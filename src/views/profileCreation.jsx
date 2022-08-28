import React, { Component } from "react";
import "../styles/loginStyle.css";
import axios from "axios";
import Cookie from "universal-cookie";
import { Navigate } from "react-router-dom";
import Background from "../img/simple_bg.jpg";

class CreateProfile extends Component {
  state = { profileCreated: false, error: null };

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
      .post("http://localhost:8248/user/createprofile", body, {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        this.setState({ profileCreated: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err });
      });
  };

  render() {
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
        {this.state.error && <p>{this.state.error.message}</p>}
        {this.state.profileCreated && (
          <Navigate to="/selection" replace={true} />
        )}
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Create Profile</h3>
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
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
      </div>
    );
  }
}

export default CreateProfile;
