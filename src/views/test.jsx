import React, { Component } from "react";
import NavBar from "../components/navbar";
import Cookie from "universal-cookie";
import axios from "axios";
import LetterChange from "./letterchange";
import SentenceShuffle from "./sentenceshuffle";
import FillInTheGaps from "./fillinthegaps";
import GroupWords from "./groupwords";
import ReadComplete from "./readcomplete";
// import Tutorial from "./tutorial";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Review from "./review";

function Test() {
  const { topicId } = useParams();
  return <TestView topicId={topicId} />;
}

class TestView extends Component {
  state = {
    exercise_list: [],
    solved_status: [],
    current_exercise_index: null,
    exercise_type: null,
    viewTutorial: false,
    dragging: false,
    current_result: null,
    isCompleted: false,
    now: 0,
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get("http://localhost:8248/user/getTestQuestions", {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        let solvestatus = [];
        for (let i = 0; i < res.data.length; i++) {
          solvestatus[i] = false;
        }
        this.setState({
          exercise_list: res.data,
          current_exercise_index: 0,
          solved_status: solvestatus,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onDragStart = (e) => {
    this.setState({ dragging: true });
  };

  onDragEnd = (e) => {
    this.setState({ dragging: false });
  };
  // renderTutorial = () => {
  //   if (this.state.viewTutorial) {
  //     return (
  //       <ReflexElement
  //         className="right-pane"
  //         minSize="200"
  //         maxSize="800"
  //         onStartResize={this.onDragStart}
  //         onStopResize={this.onDragEnd}
  //       >
  //         <div className="pane-content">
  //           <Tutorial topicId={this.props.topicId} />
  //         </div>
  //       </ReflexElement>
  //     );
  //   }
  // };
  // handleTutorial = (e) => {
  //   this.setState({
  //     viewTutorial: !this.state.viewTutorial,
  //   });
  // };
  handleNext = (e) => {
    e.preventDefault();
    const newIndex = this.state.current_exercise_index + 1;
    if (
      this.state.current_exercise_index ===
      this.state.exercise_list.length - 1
    ) {
      this.setState({
        isCompleted: true,
        // current_result: null,
      });
    } else {
      this.setState({
        current_exercise_index: newIndex,
        // current_result: null,
      });
      console.log(this.state.exercise_list[this.state.current_exercise_index]);
    }
  };
  setResult = (result) => {
    let newStatus = [...this.state.solved_status];
    if (result === "correct") {
      newStatus[this.state.current_exercise_index] = true;
    }
    this.setState({
      solved_status: newStatus,
    });
    // console.log(newStatus);
    // if (
    //   this.state.current_exercise_index ===
    //   this.state.exercise_list.length - 1
    // ) {
    //   this.setState({
    //     isCompleted: true,
    //     current_exercise_index: null,
    //     solved_status: newStatus,
    //   });
    // } else {
    //   this.setState({
    //     current_exercise_index: this.state.current_exercise_index + 1,
    //     solved_status: newStatus,
    //   });
    // }
  };
  renderResult = () => {
    return (
      <div>
        <button onClick={this.handleNext}>Next</button>
      </div>
    );
  };

  render() {
    let exercise = null;
    if (this.state.current_exercise_index != null) {
      let item = this.state.exercise_list[this.state.current_exercise_index];
      if (item.exercise_type === "changeletter") {
        exercise = (
          <LetterChange
            key={item.exercise_id}
            exercise_id={item.exercise_id}
            publishResult={this.setResult}
          />
        );
      } else if (item.exercise_type === "sentenceshuffling") {
        exercise = (
          <SentenceShuffle
            key={item.exercise_id}
            exercise_id={item.exercise_id}
            publishResult={this.setResult}
          />
        );
      } else if (item.exercise_type === "fillinthegaps") {
        exercise = (
          <FillInTheGaps
            key={item.exercise_id}
            exercise_id={item.exercise_id}
            publishResult={this.setResult}
          />
        );
      } else if (item.exercise_type === "groupwords") {
        exercise = (
          <GroupWords
            key={item.exercise_id}
            exercise_id={item.exercise_id}
            publishResult={this.setResult}
          />
        );
      } else if (item.exercise_type === "readcomplete") {
        exercise = (
          <ReadComplete
            key={item.exercise_id}
            exercise_id={item.exercise_id}
            publishResult={this.setResult}
          />
        );
      }
    }
    if (this.state.isCompleted) {
      exercise = <Review list={this.state.solved_status} />;
    }
    return (
      <React.Fragment>
        {/* {this.state.isCompleted && <Navigate to="/" replace={true} />} */}
        <NavBar />
        <br />
        <div className="container">
          {this.state.current_exercise_index != null ? (
            <ProgressBar
              now={
                (100 * this.state.current_exercise_index) /
                this.state.exercise_list.length
              }
            />
          ) : null}
        </div>
        <br />
        {/* <ReflexContainer orientation="vertical"> */}
        {/* <ReflexElement className="left-pane"> */}
        {/* <div className="container">
          <button style={{ float: "right" }} onClick={this.handleTutorial}>
            Tutorial
          </button>
        </div> */}
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
        {/* </ReflexElement> */}
        {/* <ReflexSplitter /> */}
        {/* {this.renderTutorial()} */}
        {/* </ReflexContainer> */}
      </React.Fragment>
    );
  }
}

export default Test;
