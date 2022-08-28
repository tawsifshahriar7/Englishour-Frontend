import React, { Component } from "react";
import "../styles/profile.css";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/esm/Container";
import avatar from "../avatar.jpg";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";
import Button from "react-bootstrap/Button";
import { lazy } from "react";
import axios from "axios";

class Profile extends Component {
  // id = localStorage.getItem("profile");

  state = {
    info: {
      username: "",
      first_name: "",
      last_name: "",
      dateofBirth: "",
      institution: "",
      class: "",
      profile_picture: "",
      current_level: "",
      entryTest: null,
      achievements: [null],
    },
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(`http://localhost:8248/user/profile`, {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        this.setState({ info: res.data });
        console.log(res.data);
        // if (this.state.info.profile_picture === "") {
        //   let new_info = this.state.info;
        //   new_info.profile_picture = "../avatar.jpg";
        //   this.setState({
        //     info: new_info,
        //   });
        // }
        // const myImage = lazy(() => import(this.state.info.profile_picture));
        // this.setState({ pic: myImage });
        axios
          .get(`http://localhost:8248/user/getAchievement`, {
            headers: {
              "x-access-token": cookie.get("x-access-token"),
              "profile-access-token": cookie.get("profile-access-token"),
            },
          })
          .then((res) => {
            this.setState({ achievements: [...res.data] });
            // console.log(res.data[0].topic_name);
            console.log(this.state.achievements);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.error(err));
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
    // let achievementList = this.state.achievements.map((i) => {
    //   return i;
    // });
    // console.log(achievementList);

    let dateObj = new Date(this.state.info.dateofBirth);
    let dateString =
      dateObj.getDate() +
      "/" +
      (dateObj.getMonth() + 1) +
      "/" +
      dateObj.getFullYear();
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
                  src={this.state.info.profile_picture}
                  alt="profile"
                  className="profile-pic"
                  height={100}
                  width={100}
                  onError={(e) => {
                    e.target.src = avatar;
                  }}
                />
                <div className="profile-info">
                  <h2>
                    {this.state.info.first_name} {this.state.info.last_name}
                  </h2>
                  <h6>Date of Birth: {dateString}</h6>
                  <h6>Institution: {this.state.info.institution}</h6>
                  <h6>Class: {this.state.info.class}</h6>
                  <h6>Current Level: {this.state.info.current_level}</h6>
                </div>
              </div>
            </div>
            <Link to="/updateprofile">
              <button>Edit Profile</button>
            </Link>
            <br />
            <br />
            {!this.state.info.entryTest ? (
              <Link to="/entrytest">
                <Button variant="dark">Take Entry Test</Button>
              </Link>
            ) : null}
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
                <h6>Completed {this.state.achievements}</h6>
              </li>
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
