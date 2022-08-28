import React, { Component } from "react";

import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookie from "universal-cookie";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        fontWeight: "bold",
        fontSize: 16,
      }}
    >
      <CircularProgress size={300} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          style={{ fontWeight: "bold", fontSize: 20 }}
        >
          {`${Math.round(props.value)}/100`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

class EntryTestReview extends Component {
  state = { update: null };

  componentDidMount() {
    let score = 0;
    for (let i = 0; i < this.props.list.length; i++) {
      if (this.props.list[i] === true) {
        score++;
      }
    }
    let answerList = [];
    for (let i = 0; i < this.props.list.length; i++) {
      if (this.props.list[i] === true) {
        answerList.push("correct");
      } else {
        answerList.push("wrong");
      }
    }
    var cookie = new Cookie();
    axios
      .post(
        "http://localhost:8248/user/entryTestSubmission",
        { results: answerList },
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          msg: res.data.suggested_level,
          score: (score * 100) / this.props.list.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // this.setState({ score: (score * 100) / this.props.list.length });
  }

  handleSelection = (e) => {
    const selectedLevel = this.state.msg;
    var cookie = new Cookie();
    axios
      .post(
        "http://localhost:8248/user/setSuggestedLevel",
        { selectedLevel: selectedLevel },
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          update: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleRejection = (e) => {
    // const selectedLevel = this.state.msg;
    var cookie = new Cookie();
    axios
      .post(
        "http://localhost:8248/user/setSuggestedLevel",
        { selectedLevel: 1 },
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({
          update: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h3>Entry Test Review</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgressWithLabel value={this.state.score} />
        </div>
        <br />
        <br />
        <h5
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Suggested Level: {this.state.msg}
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <div
            style={{
              padding: "10px",
            }}
          >
            <button onClick={this.handleSelection}>
              Select Suggested Level
            </button>
          </div>
          <div
            style={{
              padding: "10px",
            }}
          >
            <button onClick={this.handleRejection}>
              Reject Suggested Level
            </button>
          </div>
        </div>
        <br />
        <h6
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {this.state.update}
        </h6>
      </React.Fragment>
    );
  }
}

export default EntryTestReview;
