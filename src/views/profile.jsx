import React, { Component } from "react";
import "../styles/profile.css";
import NavBar from "../components/navbar";

class Profile extends Component {
  id = 1;

  state = {
    info: {
      username: "",
      first_name: "",
      last_name: "",
      dateOfBirth: "",
      institution: "",
      class: "",
      profile_pic: "",
      current_level: "",
    },
  };

  componentDidMount() {
    const getInfo = async (id) => {
      await fetch(`http://localhost:8248/user/profile?profile_id=` + id)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ info: data });
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
        <div className="container bootstrap snippets bootdey">
          <div className="row">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#">
                    <img src={this.state.info.profile_pic} alt="" />
                  </a>
                  <h1>{this.state.info.username}</h1>
                  <p>
                    {this.state.info.first_name} {this.state.info.last_name}
                  </p>
                </div>

                <ul className="nav nav-pills nav-stacked">
                  <li className="active">
                    <a href="#">
                      {" "}
                      <i className="fa fa-user"></i> Profile
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-calendar"></i> Recent Activity{" "}
                      <span className="label label-warning pull-right r-activity">
                        9
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="button" href="#popup">
                      {" "}
                      <i className="fa fa-edit"></i> Edit profile
                    </a>
                    <div className="popup" id="popup">
                      <div className="popup-inner">
                        <div className="popup-left">
                          <div className="popup__photo">
                            <img src={this.state.info.profile_pic} alt="" />
                          </div>
                          <div className="popup-img-btn">
                            <button>CHANGE</button>
                          </div>
                        </div>
                        <div className="popup__text">
                          <form onSubmit={this.handleSubmit}>
                            <div
                              className="form-inline popup-text-content"
                              key={this.id}
                            >
                              <label>Username: </label>
                              <input
                                type="text"
                                name="username"
                                defaultValue={this.state.info.username || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />
                              <label>First Name: </label>
                              <input
                                type="text"
                                name="first_name"
                                defaultValue={this.state.info.first_name || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />
                              <label>Last Name: </label>
                              <input
                                type="text"
                                name="last_name"
                                defaultValue={this.state.info.last_name || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />
                              <label>Date of Birth</label>
                              <input
                                type="text"
                                name="dateOfBirth"
                                defaultValue={this.state.info.dateOfBirth || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />

                              <label>Instituion</label>
                              <input
                                type="text"
                                name="instituion"
                                defaultValue={this.state.info.institution || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />

                              <label>Class</label>
                              <input
                                type="text"
                                name="class"
                                defaultValue={this.state.info.class || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />

                              <label>Profile Image</label>
                              <input
                                type="text"
                                name="profile_pic"
                                defaultValue={this.state.info.profile_pic || ""}
                                onChange={(e) => this.handleChange(e)}
                              />
                              <br />
                            </div>
                            <div className="button-section">
                              <button
                                className="button cancel-btn"
                                type="button"
                                onClick={() => this.addFormFields()}
                              >
                                Cancel
                              </button>
                              <button
                                className="button update-btn"
                                type="submit"
                                onClick={(e) => this.handleSubmit(e)}
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                        <a className="popup__close" href="#">
                          X
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
