import React, { Component } from "react";
import NavBar from "../components/navbar";
import Cookie from "universal-cookie";
import axios from "axios";
import LetterChange from "./letterchange";
import SentenceShuffle from "./sentenceshuffle";
import GroupWords from "./groupwords";
import ReadComplete from "./readcomplete";
import Tutorial from "./tutorial";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { useParams } from "react-router-dom";

function Exercise() {
  const { topicId } = useParams();
  return <ExerciseView topicId={topicId} />;
}

class ExerciseView extends Component {
  state = {
    exercise_list: [],
    current_exercise_index: null,
    exercise_type: null,
    viewTutorial: false,
    dragging: false,
    current_result: null,
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(
        "http://localhost:8248/user/getExerciseList?topic_id=" +
          this.props.topicId,
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        this.setState({
          exercise_list: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      exercise_list: [1, 2],
      exercise_type: "changeletter",
      current_exercise_index: 0,
    });
  }
  onDragStart = (e) => {
    this.setState({ dragging: true });
  };

  onDragEnd = (e) => {
    this.setState({ dragging: false });
  };
  renderTutorial = () => {
    if (this.state.viewTutorial) {
      return (
        <ReflexElement
          className="right-pane"
          minSize="200"
          maxSize="800"
          onStartResize={this.onDragStart}
          onStopResize={this.onDragEnd}
        >
          <div className="pane-content">
            <Tutorial />
          </div>
        </ReflexElement>
      );
    }
  };
  handleTutorial = (e) => {
    this.setState({
      viewTutorial: !this.state.viewTutorial,
    });
  };
  handleNext = (e) => {
    this.setState({
      current_exercise_index: this.state.current_exercise_index + 1,
      exercise_type: "groupwords",
      current_result: null,
    });
  };
  setResult = (result) => {
    this.setState({ current_result: result });
  };
  renderResult = () => {
    if (this.state.current_result === "correct") {
      return (
        <div>
          <h3>Correct!</h3>
          <br />
          <button onClick={this.handleNext}>Next</button>
        </div>
      );
    } else if (this.state.current_result === "wrong") {
      return (
        <div>
          <h3>Wrong!</h3>
          <br />
          <button>Try Again</button>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    let exercise = null;
    if (this.state.exercise_type === "changeletter") {
      exercise = (
        <LetterChange
          exercise_id={
            this.state.exercise_list[this.state.current_exercise_index]
          }
          publishResult={this.setResult}
        />
      );
    } else if (this.state.exercise_type === "sentenceshuffle") {
      exercise = (
        <SentenceShuffle
          exercise_id={
            this.state.exercise_list[this.state.current_exercise_index]
          }
          publishResult={this.setResult}
        />
      );
    } else if (this.state.exercise_type === "groupwords") {
      exercise = (
        <GroupWords
          exercise_id={
            this.state.exercise_list[this.state.current_exercise_index]
          }
          publishResult={this.setResult}
        />
      );
    } else if (this.state.exercise_type === "readcomplete") {
      exercise = (
        <ReadComplete
          exercise_id={
            this.state.exercise_list[this.state.current_exercise_index]
          }
          publishResult={this.setResult}
        />
      );
    }
    return (
      <React.Fragment>
        <NavBar />
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane">
            <div className="container">
              <button style={{ float: "right" }} onClick={this.handleTutorial}>
                Tutorial
              </button>
            </div>
            <div className="container">{exercise}</div>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.renderResult()}
            </div>
          </ReflexElement>
          <ReflexSplitter />
          {this.renderTutorial()}
        </ReflexContainer>
      </React.Fragment>
    );
  }
}

export default Exercise;
