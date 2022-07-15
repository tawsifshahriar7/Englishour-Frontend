import React, { Component } from "react";
import NavBar from "../components/navbar";
import Sentence from "../components/letterchange/row";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LetterChange extends Component {
  state = {};

  handleInput = (e) => {
    this.setState({
      Input: e.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div
          className="container"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <h3>Change one Letter to make new words</h3>
          <br />
          <br />
          <Container>
            <Row>
              <Col></Col>
              <Col>First Clue</Col>
            </Row>
          </Container>
          <br />
          <Sentence sentence="An animal" handleChange={this.handleInput} />
          <br />
          <Sentence
            sentence="Object to put on floor"
            handleChange={this.handleInput}
          />
        </div>
        <br />
        <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
          <button>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}

export default LetterChange;
