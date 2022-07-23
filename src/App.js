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
import Logout from "./views/logout";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="readcomplete" element={<ReadComplete />} />
          <Route path="letterchange" element={<LetterChange />} />
          <Route path="sentenceshuffle" element={<SentenceShuffle />} />
          <Route path="groupwords" element={<GroupWords />} />
          <Route path="profile" element={<Profile />} />
          <Route path="selection" element={<Selection />} />
          <Route path="logout" element={<Logout />} />
          <Route path="createprofile" element={<CreateProfile />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
