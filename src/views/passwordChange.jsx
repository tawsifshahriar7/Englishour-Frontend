import React, { Component } from "react";
import "../styles/loginStyle.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

class PasswordChange extends Component {
  state = {
    username: null,
    secret_question: null,
    secret_answer: null,
    password: null,
    confirm_password: null,
    passwordChanged: false,
    errormsg: null,
  };
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handleSecretAnswerChange = (e) => {
    this.setState({ secret_answer: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({ confirm_password: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, secret_answer, password, confirm_password } = this.state;
    const body = {
      username: username,
      secret_answer: secret_answer,
      password: password,
      confirm_password: confirm_password,
    };
    if (password != confirm_password) {
      this.setState({ errormsg: "Passwords don't match" });
      return;
    }
    axios
      .post("http://localhost:8248/user/changepassword", body)
      .then((res) => {
        console.log(res);
        this.setState({ passwordChanged: true, errormsg: null });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ errormsg: err.response.data });
      });
  };
  handleUsernameSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    axios
      .get("http://localhost:8248/user/getSecretQuestion?username=" + username)
      .then((res) => {
        this.setState({ secret_question: res.data, errormsg: null });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ secret_question: null, errormsg: err.response.data });
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.passwordChanged && <Navigate to="/login" replace={true} />}
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Change Password</h3>
              <p>{this.state.errormsg}</p>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Username"
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleUsernameSubmit}
                >
                  Submit Username
                </button>
              </div>
              <div className="form-group mt-3">
                <label>Question</label>
                <p>{this.state.secret_question}</p>
              </div>
              <div className="form-group mt-3">
                <label>Answer</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter secret answer"
                  onChange={this.handleSecretAnswerChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={this.handlePasswordChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Re-enter password"
                  onChange={this.handleConfirmPasswordChange}
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
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default PasswordChange;
