import React, { Component } from "react";
import "../styles/profile.css";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/esm/Container";
import avatar from "../avatar.jpg";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";

class Profile extends Component {
  id = localStorage.getItem("profile");

  state = {
    info: {
      username: "",
      first_name: "",
      last_name: "",
      dateofBirth: "",
      institution: "",
      class: "",
      profile_pic: "",
      current_level: "",
    },
  };

  componentDidMount() {
    const getInfo = async (id) => {
      var cookie = new Cookie();
      await fetch(`http://localhost:8248/user/profile`, {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ info: data });
          console.log(this.state.info);
          if (this.state.info.profile_pic === "") {
            let new_info = this.state.info;
            new_info.profile_pic = avatar;
            this.setState({
              info: new_info,
            });
          }
        })
        .catch((err) => console.error(err));
    };
    getInfo(this.id);
  }

  handleChange = async (e) => {
    e.preventDefault();

    const item = e.target.name;
    console.log(item);
    const updatedValue = { ...this.info, [item]: e.target.value };
    console.log(updatedValue);
    this.setState({ info: updatedValue });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  };

  addFormFields = () => {
    // empty
  };

  render() {
    return (
      <React.Fragment>
        <NavBar isLoggedIn={this.props.isLoggedIn} />
        <Container>
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-header-left">
                <br />
                <br />
                <img
                  src={avatar}
                  alt="profile"
                  className="profile-pic"
                  height={100}
                  width={100}
                />
                <div className="profile-info">
                  <h2>
                    {this.state.info.first_name} {this.state.info.last_name}
                  </h2>
                  <h6>
                    Date of Birth:{" "}
                    {this.state.info.dateofBirth.substring(0, 10)}
                  </h6>
                  <h6>Institution: {this.state.info.institution}</h6>
                  <h6>Class: {this.state.info.class}</h6>
                  <h6>Current Level: {this.state.info.current_level}</h6>
                </div>
              </div>
            </div>
            <Link to="/editprofile">
              <button>Edit Profile</button>
            </Link>
          </div>
          <br />
          <br />
          <div
            style={{
              background: "ghostwhite",
              padding: "10px",
              border: "1px solid lightgray",
              margin: "10px",
            }}
          >
            <h3>Achievements</h3>
            <ul>
              <li>
                <h6>Created Profile</h6>
              </li>
            </ul>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Profile;
