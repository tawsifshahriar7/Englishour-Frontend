import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ReadComplete extends Component {
  state = {
    firstRow : ["swim", "play football", "play piano", "sing", "write"],
    list : [
       [
          {type: "text", content: "Alex"},
          {type: "blank", content: ""},
          {type: "blank", content: ""},
          {type: "input", content: ""},
          {type: "blank", content: ""},
          {type: "blank", content: ""}
       ],
       [
          {type: "text", content: "Meera"},
          {type: "input", content: ""},
          {type: "blank", content: ""},
          {type: "blank", content: ""},
          {type: "input", content: ""},
          {type: "blank", content: ""}
       ],
       [
          {type: "text", content: "Lenny"},
          {type: "blank", content: ""},
          {type: "input", content: ""},
          {type: "input", content: ""},
          {type: "blank", content: ""},
          {type: "blank", content: ""},
       ]
    ],
    sentences : [
      "Alex likes to swim.",
      "Meera likes to play football.",
      "Lenny likes to play piano."
    ]
  };

  render() {
    let firstRowElements = [ <Col></Col> ];

    this.state.firstRow.map((item) => {
      firstRowElements.push(<Col>{item}</Col>);
    });

    const rows = this.state.list.map((item, index) => {
        return (
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
                return <Col></Col>;
              }
            })}
          </Row>
        );
    });

    const sentenceList = this.state.sentences.map((item, index) => {
      return (
        <Row>{index+1}. {item}</Row>
      );
    });

    return (
      <React.Fragment>
        <NavBar />
        <h1>ReadComplete</h1>
        <Container>
          <Row>
            {firstRowElements}
          </Row>
          {rows}
        </Container>
        <br></br>
        <Container style={{ width: "50%", margin: "auto", borderStyle: "solid", borderWidth: "medium" }}>
          {sentenceList}
        </Container>
      </React.Fragment>
    );
  }
}

export default ReadComplete;
