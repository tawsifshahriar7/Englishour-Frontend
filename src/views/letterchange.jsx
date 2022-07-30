import React, { Component } from "react";
import NavBar from "../components/navbar";
import Sentence from "../components/letterchange/row";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";
import axios from "axios";
import Tutorial from "./tutorial";
import Cookie from "universal-cookie";

class LetterChange extends Component {
  state = {
    exercise: [],
    input: [],
    resultList: [],
    result: null,
    viewTutorial: false,
    dragging: false,
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get("http://localhost:8248/user/letterchange?exercise_id=1", {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        this.setState({
          exercise: res.data,
        });
        const len = res.data.length;
        for (let i = 0; i < len; i++) {
          this.state.input.push("####");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const input = this.state.input;
    input[id - 1] = value;
    this.setState({
      input: input,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.state.input;
    const body = {
      exercise_id: 1,
      submitted_answer: input,
    };
    var cookie = new Cookie();
    axios
      .post("http://localhost:8248/user/submitExercise", body, {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        console.log(res);
        const len = res.data.length;
        let count = 0;
        let newResult = this.state.resultList;
        for (let i = 0; i < len; i++) {
          if (res.data[i] === true) {
            count++;

            newResult[i] = "correct";
          } else {
            newResult[i] = "wrong";
          }
        }
        if (count === len) {
          this.setState({
            result: "correct",
          });
        } else {
          this.setState({
            result: "wrong",
          });
        }
        this.setState({ resultList: newResult });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleTutorial = (e) => {
    this.setState({
      viewTutorial: !this.state.viewTutorial,
    });
  };

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

  render() {
    const listItems = this.state.exercise.map((item, index) => (
      <div key={index}>
        <Sentence
          id={item[0].item_id}
          sentence={item[0].hint}
          answer={item[0].answer}
          result={this.state.resultList[index]}
          handleChange={this.handleInput}
        />
        <br />
      </div>
    ));
    return (
      <React.Fragment>
        <NavBar />
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane">
            <div className="pane-content">
              <div
                className="container"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <h3>Change one Letter to make new words</h3>
                <button
                  style={{ float: "right" }}
                  onClick={this.handleTutorial}
                >
                  Tutorial
                </button>
                <div>{/* <Tutorial /> */}</div>
                <br />
                <br />
                {listItems}
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.result === "correct" ? (
                  <div>
                    <h3>Correct!</h3>
                    <br />
                    <button>Next</button>
                  </div>
                ) : this.state.result === "wrong" ? (
                  <div>
                    <h3>Wrong!</h3>
                    <br />
                    <button>Try Again</button>
                  </div>
                ) : null}
              </div>
            </div>
          </ReflexElement>

          <ReflexSplitter />
          {this.renderTutorial()}
        </ReflexContainer>
      </React.Fragment>
    );
  }
}

export default LetterChange;
