import React, { Component } from "react";
import "../styles/loginStyle.css";

class Register extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
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
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Re-enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;