import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/landing";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import ReadComplete from "./views/readcomplete";
import LetterChange from "./views/letterchange";
import SentenceShuffle from "./views/sentenceshuffle";
import GroupWords from "./views/groupwords";
import Profile from "./views/profile";
import Selection from "./views/profileSelection";

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
