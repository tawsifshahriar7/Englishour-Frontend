import React, { Component } from "react";
import "../styles/loginStyle.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookie from "universal-cookie";

class Login extends Component {
  state = { loggedIn: false, error: null };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const body = {
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:8248/user/login", body)
      .then((res) => {
        this.setState({ loggedIn: true });
        const cookie = new Cookie();
        cookie.set("x-access-token", res.data, { path: "/" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: err });
      });
  };
  handleusernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handlepasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.error && <p>{this.state.error.message}</p>}
        {this.state.loggedIn && <Navigate to="/selection" replace={true} />}
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
                  onChange={this.handleusernameChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={this.handlepasswordChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <a href="/passwordchange">password?</a>
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
