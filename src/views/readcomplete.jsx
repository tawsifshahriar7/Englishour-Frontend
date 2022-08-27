import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookie from "universal-cookie";
import axios from "axios";

class ReadComplete extends Component {
  state = {
    firstRow: ["swim", "play football", "play piano", "sing", "write"],
    list: [
      [
        { type: "text", content: "Alex" },
        { type: "blank", content: "" },
        { type: "blank", content: "" },
        { type: "input", content: "" },
        { type: "blank", content: "" },
        { type: "blank", content: "" },
      ],
      [
        { type: "text", content: "Meera" },
        { type: "input", content: "" },
        { type: "blank", content: "" },
        { type: "blank", content: "" },
        { type: "input", content: "" },
        { type: "blank", content: "" },
      ],
      [
        { type: "text", content: "Lenny" },
        { type: "blank", content: "" },
        { type: "input", content: "" },
        { type: "input", content: "" },
        { type: "blank", content: "" },
        { type: "blank", content: "" },
      ],
    ],
    sentences: [
      "Alex likes to swim.",
      "Meera likes to play football.",
      "Lenny likes to play piano.",
    ],
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(
        "http://localhost:8248/user/readcomplete?exercise_id=" +
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
          firstRow: res.data.rows[0],
          list: res.data.rows.slice(1),
          sentences: res.data.sentences,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let firstRowElements = [<Col></Col>]; 

    this.state.firstRow.map((item) => {
      firstRowElements.push(
        <Col>
          <b>{item}</b>
        </Col>
      );
    });

    const rows = this.state.list.map((item, index) => {
      return (
        <div>
          <Row>
            {item.map((item) => {
              if (item.type === "text") {
                return <Col>{item.content}</Col>;
              } else if (item.type === "input") {
                return (
                  <Col>
                    <input type="text" name="input" id={index} />
                  </Col>
                );
              } else if (item.type === "blank") {
                return (
                  <Col>
                    <input type="text" id={index} disabled="disabled"></input>
                  </Col>
                );
              }
            })}
          </Row>
          <br></br>
        </div>
      );
    });

    const sentenceList = this.state.sentences.map((item, index) => {
      return (
        <Row>
          {index + 1}. {item}
        </Row>
      );
    });

    return (
      <React.Fragment>
        <div class="shadow-lg p-3 mt-10 mb-5 bg-white rounded">
          <Container>
            <br />
            <br />
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Read and Complete
            </h1>
            <br />
            <br />
            <Row>{firstRowElements}</Row>
            <br></br>
            {rows}
          </Container>
          <br></br>
          <Container
            style={{
              width: "50%",
              margin: "auto",
              borderStyle: "solid",
              borderWidth: "medium",
            }}
          >
            {sentenceList}
          </Container>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button>Submit</button>
          </div>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default ReadComplete;
