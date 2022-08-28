import React, { Component } from "react";
import "../styles/loginStyle.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Background from "../img/simple_bg.jpg";

class Register extends Component {
  state = { registered: false, error: null };
  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };
  handleSecretQuestionChange = (e) => {
    this.setState({ secret_question: e.target.value });
  };
  handleSecretAnswerChange = (e) => {
    this.setState({ secret_answer: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      confirmPassword,
      secret_question,
      secret_answer,
    } = this.state;
    const body = {
      username: username,
      email: email,
      password: password,
      secret_question: secret_question,
      secret_answer: secret_answer,
    };
    if (password === confirmPassword) {
      console.log(this.state);
      axios
        .post("http://localhost:8248/user/register", body)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.setState({ registered: true });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: err });
        });
    }
  };
  render() {
    let { registered, error } = this.state;
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
        {error && <p>{error.message}</p>}
        {registered && <Navigate to="/login" replace={true} />}
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Username"
                  onChange={this.handleUsernameChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={this.handleEmailChange}
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
              <div className="form-group mt-3">
                <label>Secret Question</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter secret question"
                  onChange={this.handleSecretQuestionChange}
                />
              </div>
              <div className="form-group mt-3">
                <label>Secret Answer</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Enter secret answer"
                  onChange={this.handleSecretAnswerChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmit}
                >
                  Register
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

export default Register;
