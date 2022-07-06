import React, { Component } from "react";
import NavBar from "../components/navbar";
import Sentence from "../components/letterchange/row";

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
          <Sentence sentence="An animal" handleChange={this.handleInput} />
          <br />
          <Sentence
            sentence="Object to put on floor"
            handleChange={this.handleInput}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default LetterChange;
