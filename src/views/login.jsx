import React, { Component } from "react";
import "../styles/loginStyle.css";

class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter username"
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
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <a href="#">password?</a>
              </p>
              <br />
              <p className="text-right mt-2">
                Don't have an Account? <a href="/register">Sign Up</a>
              </p>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
