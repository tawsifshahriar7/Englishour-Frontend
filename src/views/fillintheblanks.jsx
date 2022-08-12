import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Cookie from "universal-cookie";

import "../styles/fillinblank.css"

class FillInTheBlanks extends Component {
  state = {
    clueList: ["Clue 1", "Clue 2", "Clue 3", "Clue 4", "Clue 5"],
    sentenceList: [" Sentence 1 ", " Sentence 2 "," Sentence 3 "," Sentence 4 "," Sentence 5 ",],
    submission: [],
    result: null,
  };

  dragItem = React.createRef();
  dragOverItem = React.createRef();


  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get("http://localhost:8248/user/fillintheblanks?exercise_id=2", {
        headers: {
          "x-access-token": cookie.get("x-access-token"),
          "profile-access-token": cookie.get("profile-access-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        //this.setState({ list: res.data[0].shuffled_sentence.split(" ") });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dragOver = (ev, position) => {
    ev.preventDefault();
    this.dragOverItem.current = position;
    console.log("drag over blank : ",position)
  }

  drag = (ev, position) => {
    ev.dataTransfer.setData("Text", ev.target.id);
    this.dragItem.current = position;
    console.log("drag of clue : ",position)
  }

  drop = (ev) => {
    console.log("dropped")
    var data = ev.dataTransfer.getData("Text");
    ev.target.parentNode.replaceChild(document.getElementById(data), ev.target);
    document.getElementById(data).className = "blankText";

  }

  handleSubmit = (e) => {
    e.preventDefault();
    var cookie = new Cookie();
    axios
      .post(
        "http://localhost:8248/user/submitExercise",
        {
          exercise_id: 2,
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
        this.setState({ result: res.data[0].result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const clues = this.state.clueList.map((item, index) => (


      <span class="draggable" id={index} draggable onDragStart={(e) => this.drag(e,index)}>{item}</span>


    ));

    const partialSentences = this.state.sentenceList.map((item, index) => (

      <span>
        {item}
        <span droppable id={index} onDrop={(e) => this.drop(e,index)} onDragOver={(e) => this.dragOver(e,index)}> _________ </span>
      </span>


    ));

    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <h3 style={{ textAlign: "center" }}>
            Fill in the Blanks to Complete the Paragraph
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
            {clues}
          </div>
          <br />

          <div align="center">

            <br />
            {partialSentences}
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

export default FillInTheBlanks;
