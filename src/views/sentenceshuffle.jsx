import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";

class SentenceShuffle extends Component {
  state = {
    list: ["Word 1", "Word 2", "Word 3", "Word 4", "Word 5"],
    submission: [],
    result: null,
  };
  dragItem = React.createRef();
  dragOverItem = React.createRef();

  componentDidMount() {
    axios
      .get("http://localhost:8248/user/sentenceshuffle?exercise_id=2")
      .then((res) => {
        // console.log(res.data[0][0]);
        this.setState({ list: res.data[0][0].shuffled_sentence.split(" ") });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dragStart = (e, position) => {
    this.dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  dragEnter = (e, position) => {
    this.dragOverItem.current = position;
    console.log(e.target.innerHTML);
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
    console.log(this.state.submission);
    axios
      .post("http://localhost:8248/user/submitExercise", {
        exercise_id: 2,
        submitted_answer: this.state.submission,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ result: res.data[0] });
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
        <NavBar />
        <Container>
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
            {this.state.result === true ? (
              <div>
                <h3>Correct!</h3>
                <br />
                <button>Next</button>
              </div>
            ) : this.state.result === false ? (
              <div>
                <h3>Wrong!</h3>
                <br />
                <button>Try Again</button>
              </div>
            ) : null}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default SentenceShuffle;
