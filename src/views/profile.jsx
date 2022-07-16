import React, { Component } from "react";
import "../styles/profile.css";
import NavBar from "../components/navbar";

class Profile extends Component {
  id = 1;

  state = { info: {
    username: "DaiMaou",
    first_name: "Zuhair",
    last_name: "Zaki",
    dateOfBirth: "11/11/1999",
    institution: "Tokyo Metropolitan High School",
    class: "8",
    profile_pic: "https://i.pinimg.com/736x/77/47/4d/77474d655da2f1bae484210ecc1c7622.jpg",
    current_level: 1,
    password: "123#456%"
  }};

    handleChange =  async (e) => {
        e.preventDefault();

        const item = e.target.name;
        console.log(item);
        const updatedValue = { ...this.info, [item]: e.target.value };
        console.log(updatedValue);
        this.setState({ info: updatedValue });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
    }

    addFormFields = () => {
        // empty
    }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container bootstrap snippets bootdey">
            <div className="row">
            <div className="profile-nav col-md-3">
                <div className="panel">
                    <div className="user-heading round">
                        <a href="#">
                            <img src={this.state.info.profile_pic} alt=""/>
                        </a>
                        <h1>{this.state.info.username}</h1>
                        <p>{this.state.info.first_name} {this.state.info.last_name}</p>
                    </div>

                    <ul className="nav nav-pills nav-stacked">
                        <li className="active"><a href="#"> <i className="fa fa-user"></i> Profile</a></li>
                        <li><a href="#"> <i className="fa fa-calendar"></i> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
                        <li>
                            <a className="button" href="#popup"> <i className="fa fa-edit"></i> Edit profile</a>
                            <div className="popup" id="popup">
                                <div className="popup-inner">
                                    <div className="popup-left">
                                        <div className="popup__photo">
                                            <img src={this.state.info.profile_pic} alt=""/>
                                        </div>
                                    <div className="popup-img-btn"><button>CHANGE</button></div>
                                </div>
                                <div className="popup__text">
                                <form onSubmit={this.handleSubmit}>
                                        <div className="form-inline popup-text-content" key={this.id}>
                                        <label>Username: </label>
                                        <input type="text" name="username" defaultValue={this.state.info.username || ""}  onChange={e => this.handleChange(e)} />
                                        <br/>
                                        <label>First Name: </label>
                                        <input type="text" name="first_name" defaultValue={this.state.info.first_name || ""}  onChange={e => this.handleChange(e)} />
                                        <br/>
                                        <label>Last Name: </label>
                                        <input type="text" name="last_name" defaultValue={this.state.info.last_name || ""} onChange={e => this.handleChange(e)} />  
                                        <br/>
                                        <label>Date of Birth</label>
                                        <input type="text" name="dateOfBirth" defaultValue={this.state.info.dateOfBirth || ""} onChange={e => this.handleChange(e)} />
                                        <br/>

                                        <label>Instituion</label>
                                        <input type="text" name="instituion" defaultValue={this.state.info.institution || ""} onChange={e => this.handleChange(e)} />
                                        <br/>

                                        <label>Class</label>
                                        <input type="text" name="class" defaultValue={this.state.info.class || ""} onChange={e => this.handleChange(e)} />
                                        <br/>

                                        <label>Password</label>
                                        <input type="password" name="password" defaultValue={this.state.info.password || ""} onChange={e => this.handleChange(e)} />
                                        <br/>

                                        <label>Profile Image</label>
                                        <input type="text" name="profile_pic" defaultValue={this.state.info.profile_pic || ""} onChange={e => this.handleChange(e)} />
                                        <br/>
                                        </div>
                                    <div className="button-section">
                                        <button className="button cancel-btn" type="button" onClick={() => this.addFormFields()}>Cancel</button>
                                        <button className="button update-btn" type="submit" onClick={e => this.handleSubmit(e)}>Update</button>
                                    </div>
                                </form>

                                </div>
                                <a className="popup__close" href="#">X</a>
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