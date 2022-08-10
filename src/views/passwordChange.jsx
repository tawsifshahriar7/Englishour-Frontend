import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class PasswordChange extends Component {
  state = {
    username: null,
    secret_answer: null,
    password: null,
    passwordChanged: false,
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
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, secret_answer, password } = this.state;
    const body = {
      username: username,
      secret_answer: secret_answer,
      password: password,
    };
    axios
      .post("http://localhost:8248/user/changepassword", body)
      .then((res) => {
        console.log(res);
        this.setState({ passwordChanged: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.passwordChanged && <Navigate to="/login" replace={true} />}
        <h1>Password Change</h1>
        <div>
          <form>
            <label>Username</label>
            <input type="text" onChange={this.handleUsernameChange} />
            <br />
            <label>Scret Question Answer</label>
            <input
              type="text"
              name="answer"
              onChange={this.handleSecretAnswerChange}
            />
            <br />
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={this.handlePasswordChange}
            />
            <br />
            <button onClick={this.handleSubmit}>Change Password</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default PasswordChange;
