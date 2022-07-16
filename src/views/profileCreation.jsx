import React, { Component } from "react";
import "../styles/loginStyle.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

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
    this.setState({ class: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, dateOfBirth, institution } = this.state;
    const username = localStorage.getItem("user");
    const body = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      dateofBirth: dateOfBirth,
      institution: institution,
    };
    axios
      .post("http://localhost:8248/user/createprofile", body)
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
      <React.Fragment>
        {this.state.error && <p>{this.state.error.message}</p>}
        {this.state.profileCreated && (
          <Navigate to="/selection" replace={true} />
        )}
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Create Profile</h3>
              {/* <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter username"
                />
              </div> */}
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
    );
  }
}

export default CreateProfile;
