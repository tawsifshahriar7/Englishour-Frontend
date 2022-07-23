import React, { Component } from "react";
import NavBar from "../components/navbar";
import Sentence from "../components/letterchange/row";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import axios from "axios";
import Tutorial from "./tutorial";

class LetterChange extends Component {
  state = {
    exercise: [],
    input: [],
    result: null,
    viewTutorial: false,
    dragging: false,
  };

  componentDidMount() {
    axios
      .get("http://localhost:8248/user/letterchange?exercise_id=1")
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
    axios
      .post("http://localhost:8248/user/submitExercise", body)
      .then((res) => {
        console.log(res);
        const len = res.data.length;
        let count = 0;
        for (let i = 0; i < len; i++) {
          if (res.data[i] === true) {
            count++;
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

  renderSplitView = () => {
    return (
      <div className="my-iframe">
        {this.state.dragging && <div className="my-iframe-overlay" />}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          nostrum consectetur molestias voluptas beatae deleniti, fugit, iure
          non architecto tempora deserunt, ipsa nulla impedit reiciendis
          temporibus ab totam iste laborum.
        </p>
      </div>
    );
  };

  render() {
    const listItems = this.state.exercise.map((item, index) => (
      <div key={index}>
        <Sentence
          id={item[0].item_id}
          sentence={item[0].hint}
          answer={item[0].answer}
          handleChange={this.handleInput}
        />
        <br />
      </div>
    ));
    return (
      <React.Fragment>
        <NavBar />
        <SplitterLayout
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <div className="my-pane">
            <div
              className="container"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <h3>Change one Letter to make new words</h3>
              <button style={{ float: "right" }} onClick={this.handleTutorial}>
                Tutorial
              </button>
              <div>
                <Tutorial />
              </div>
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
          {this.state.viewTutorial ? this.renderSplitView() : null}
        </SplitterLayout>
      </React.Fragment>
    );
  }
}

export default LetterChange;
