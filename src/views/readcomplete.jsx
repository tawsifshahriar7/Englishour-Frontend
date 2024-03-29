import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Cookie from "universal-cookie";

class ReadComplete extends Component {
  state = {
    nrows: 0,
    ncols: 0,
    firstRow: [],
    list: [],
    resultList: [],
    sentences: [],
    isSubmitted: false,
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
          nrows: res.data.no_rows,
          ncols: res.data.no_cols,
          firstRow: res.data.first_row,
          list: res.data.rows,
          sentences: res.data.sentenceList,
        });

        let result_list = [];
        for (let i = 1; i < this.state.nrows; i++) {
          let row = [];
          row.push(this.state.list[i - 1][0]);
          for (let j = 1; j <= this.state.ncols; j++) {
            row.push("blank");
          }
          result_list.push(row);
        }

        this.setState({ resultList: result_list });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const result_list = this.state.resultList;
    result_list[Math.floor(id / this.state.ncols)][id % this.state.ncols] =
      value;
    this.setState({
      resultList: result_list,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var cookie = new Cookie();
    axios
      .post(
        "http://localhost:8248/user/submitExercise",
        {
          exercise_id: this.props.exercise_id,
          submitted_answer: this.state.resultList,
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
        let result = res.data ? "correct" : "wrong";
        this.props.publishResult(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            {item.map((cell, i) => {
              if (i === 0) {
                return <Col>{cell}</Col>;
              } else {
                if (cell === "blank") {
                  return (
                    <Col>
                      <input
                        type="text"
                        id={index}
                        disabled="disabled"
                        style={{ width: "80px" }}
                      ></input>
                    </Col>
                  );
                } else {
                  return (
                    <Col>
                      <input
                        type="text"
                        name="input"
                        id={index * this.state.ncols + i}
                        style={{ width: "80px" }}
                        onChange={this.handleInput}
                      />
                    </Col>
                  );
                }
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
            {!this.state.isSubmitted ? (
              <button onClick={this.handleSubmit}>Submit</button>
            ) : null}
          </div>
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default ReadComplete;
