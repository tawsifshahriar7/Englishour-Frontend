import React, { Component } from "react";
import "../styles/loginStyle.css";

class CreateProfile extends Component {
  state = {};
  
  render() {
    return (
      <React.Fragment>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Create Profile</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group mt-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="First name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Last name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="form-control mt-1"
                />
              </div>
              <div className="form-group mt-3">
                <label>Institution</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Institute"
                />
              </div>
              <div className="form-group mt-3">
                <label>Class</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter Class"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
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