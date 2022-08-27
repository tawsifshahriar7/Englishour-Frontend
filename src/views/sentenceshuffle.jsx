import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Cookie from "universal-cookie";

class SentenceShuffle extends Component {
  state = {
    list: ["Word 1", "Word 2", "Word 3", "Word 4", "Word 5"],
    submission: ["Word 1", "Word 2", "Word 3", "Word 4", "Word 5"],
    isSubmitted: false,
  };
  dragItem = React.createRef();
  dragOverItem = React.createRef();

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(
        "http://localhost:8248/user/sentenceshuffle?exercise_id=" +
          this.props.exercise_id,
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        let processedData = res.data[0].shuffled_sentence.split(" ");
        this.setState({ list: processedData, submission: processedData });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dragStart = (e, position) => {
    this.dragItem.current = position;
  };

  dragEnter = (e, position) => {
    this.dragOverItem.current = position;
  };

  drop = (e) => {
    const copyListItems = [...this.state.list];
    const dragItemContent = copyListItems[this.dragItem.current];
    copyListItems.splice(this.dragItem.current, 1);
    copyListItems.splice(this.dragOverItem.current, 0, dragItemContent);
    this.dragItem.current = null;
    this.dragOverItem.current = null;
    this.setState({ list: copyListItems });
    let answer = copyListItems.join(" ");
    let submitted_answer = [];
    submitted_answer.push(answer);
    this.setState({ submission: submitted_answer });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var cookie = new Cookie();
    axios
      .post(
        "http://localhost:8248/user/submitExercise",
        {
          exercise_id: this.props.exercise_id,
          submitted_answer: this.state.submission,
        },
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        this.setState({ isSubmitted: true });
        let result = res.data[0].result ? "correct" : "wrong";
        this.props.publishResult(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const listItems = this.state.list.map((item, index) => (
      <div
        style={{
          backgroundColor: "lightblue",
          margin: "2px",
          width: "10%",
          textAlign: "center",
          fontSize: "20px",
        }}
        onDragStart={(e) => this.dragStart(e, index)}
        onDragEnter={(e) => this.dragEnter(e, index)}
        onDragEnd={this.drop}
        key={index}
        draggable
      >
        {item}
      </div>
    ));

    return (
      <React.Fragment>
        <Container>
          <div class="shadow-lg p-3 mt-10 mb-5 bg-white rounded">
            <h3 style={{ textAlign: "center" }}>
              Shuffle the words to make correct sentence
            </h3>
            <br />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {listItems}
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
              {!this.state.isSubmitted ? (
                <button onClick={this.handleSubmit}>Submit</button>
              ) : null}
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default SentenceShuffle;
