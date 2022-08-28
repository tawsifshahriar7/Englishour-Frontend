import React, { Component } from "react";

import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

class Review extends Component {
  state = { msg: null };

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
        "http://localhost:8248/user/testSubmission",
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
          msg: res.data.message,
          score: (score * 100) / this.props.list.length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div class="shadow-lg p-3 mt-10 mb-5 bg-white rounded">
        <h3>Review</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgressWithLabel value={this.state.score} />
        </div>
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
          {this.state.msg}
        </h5>
      </React.Fragment>
    );
  }
}

export default Review;
