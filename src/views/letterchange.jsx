import React, { Component } from "react";
import Sentence from "../components/letterchange/row";
import "react-reflex/styles.css";
import axios from "axios";
import Cookie from "universal-cookie";

class LetterChange extends Component {
  state = {
    exercise: [],
    input: [],
    resultList: [],
    viewTutorial: false,
    isSubmitted: false,
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(
        "http://localhost:8248/user/letterchange?exercise_id=" +
          this.props.exercise_id,
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        this.setState({
          exercise: res.data,
        });
        const len = res.data.length;
        console.log(len);
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
    // console.log(input);
    // if (input.length === 0) {
    //   for (let i = 0; i < this.state.exercise.length; i++) {
    //     input.push("####");
    //   }
    // }
    const body = {
      exercise_id: this.props.exercise_id,
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
          this.props.publishResult("correct");
        } else {
          this.props.publishResult("wrong");
        }
        this.setState({ resultList: newResult, isSubmitted: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const listItems = this.state.exercise.map((item, index) => (
      <div key={index}>
        <Sentence
          id={index + 1}
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
        <div class="shadow-lg p-3 mt-10 mb-5 bg-white rounded">
          <div className="pane-content">
            <div
              className="container"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <h3>Change one Letter to make new words</h3>
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
              {!this.state.isSubmitted ? (
                <button onClick={this.handleSubmit}>Submit</button>
              ) : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LetterChange;
