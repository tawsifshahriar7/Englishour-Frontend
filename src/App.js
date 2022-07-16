import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/landing";
import Home from "./views/home";
import Login from "./views/login";
import ReadComplete from "./views/readcomplete";
import LetterChange from "./views/letterchange";
import SentenceShuffle from "./views/sentenceshuffle";
import GroupWords from "./views/groupwords";
import Profile from "./views/profile";
import Selection from "./views/profileSelection";
import Register from "./views/registration";
import CreateProfile from "./views/profileCreation";

class App extends Component {
  state = { isLoggedIn: false, user: null };
  setLogin = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  };
  setUser = (user) => {
    this.setState({ user });
  };
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="home"
            element={
              <Home isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
            }
          />
          <Route
            path="login"
            element={
              <Login
                setloginstate={this.setLogin}
                setuserstate={this.setUser}
              />
            }
          />
          <Route path="register" element={<Register />} />
          <Route
            path="readcomplete"
            element={
              <ReadComplete
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
          <Route
            path="letterchange"
            element={
              <LetterChange
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
          <Route
            path="sentenceshuffle"
            element={
              <SentenceShuffle
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
          <Route
            path="groupwords"
            element={
              <GroupWords
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Profile
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
          <Route
            path="selection"
            element={
              <Selection
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
          <Route path="logout" element={<Landing />} />
          <Route
            path="createprofile"
            element={
              <CreateProfile
                isLoggedIn={this.state.isLoggedIn}
                user={this.state.user}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
