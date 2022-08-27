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
          firstRow: res.data.rows[0],
          list: res.data.rows.slice(1),
          resultList: res.data.rows.slice(1),
          sentences: res.data.sentences,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const result_list = this.state.resultList;
    result_list[Math.floor(id/this.state.ncols)][id%this.state.ncols] = { type: "input", content: value };
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
            {item.map((cell,i) => {
              if (cell.type === "input") {
                return (
                  <Col>
                    <input type="text" name="input" id={index*this.state.ncols+i} onChange={this.handleInput}/>
                  </Col>
                );
              } else if (cell.type === "blank") {
                return (
                  <Col>
                    <input type="text" id={index} disabled="disabled"></input>
                  </Col>
                );
              }
              else {
                return <Col>{cell.content}</Col>;
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
