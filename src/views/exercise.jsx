import React, { Component } from "react";
import NavBar from "../components/navbar";
import Cookie from "universal-cookie";
import axios from "axios";
import LetterChange from "./letterchange";
import SentenceShuffle from "./sentenceshuffle";
import GroupWords from "./groupwords";
import ReadComplete from "./readcomplete";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";

class Exercise extends Component {
  state = {
    exercise_list: [],
    exercise_id: 1,
    exercise_type: null,
    viewTutorial: false,
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get("http://localhost:8248/user/exercise", {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        this.setState({
          exercise_list: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let exercise = null;
    if (this.state.exercise_type === "letterchange") {
      exercise = <LetterChange />;
    } else if (this.state.exercise_type === "sentenceshuffle") {
      exercise = <SentenceShuffle />;
    } else if (this.state.exercise_type === "groupwords") {
      exercise = <GroupWords />;
    } else if (this.state.exercise_type === "readcomplete") {
      exercise = <ReadComplete />;
    }
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">{exercise}</div>
      </React.Fragment>
    );
  }
}

export default Exercise;
