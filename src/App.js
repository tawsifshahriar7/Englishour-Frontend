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
import Exercise from "./views/exercise";
import ProfileUpdate from "./views/updateProfile";
import PasswordChange from "./views/passwordChange";
import FillInTheGaps from "./views/fillinthegaps";
import Test from "./views/test";
import EntryTest from "./views/entry_test";
import Review from "./views/review";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route path="home/:flag" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="exercise/:topicId" element={<Exercise />} />
          <Route path="readcomplete" element={<ReadComplete />} />
          <Route path="letterchange" element={<LetterChange />} />
          <Route path="sentenceshuffle" element={<SentenceShuffle />} />
          <Route path="groupwords" element={<GroupWords />} />
          <Route path="profile" element={<Profile />} />
          <Route path="selection" element={<Selection />} />
          <Route path="logout" element={<Logout />} />
          <Route path="createprofile" element={<CreateProfile />} />
          <Route path="updateprofile" element={<ProfileUpdate />} />
          <Route path="passwordchange" element={<PasswordChange />} />
          <Route path="fillinthegaps" element={<FillInTheGaps />} />
          <Route path="test" element={<Test />} />
          <Route path="entrytest" element={<EntryTest />} />
          <Route path="review" element={<Review />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
