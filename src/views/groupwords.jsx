import React, { Component } from "react";
import "../styles/groupWord.css";
import axios from "axios";
import Cookie from "universal-cookie";

class GroupWords extends Component {
  state = {
    list: [
      { name: "Word 1", category: "Cat0" },
      { name: "Word 2", category: "Cat0" },
      { name: "Word 3", category: "Cat0" },
      { name: "Word 4", category: "Cat0" },
      { name: "Word 5", category: "Cat0" },
    ],
    cat: ["Words", "Cat1", "Cat2", "Cat3"],
  };

  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(
        "http://localhost:8248/user/groupwords?exercise_id=" +
          this.props.exercise_id,
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        let newList = [];
        res.data.wordList.map((i) => {
          newList.push({ name: i, category: res.data.categoryList[0] });
        });
        this.setState({ cat: res.data.categoryList, list: newList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");

    let items = this.state.list.filter((item) => {
      if (item.name === id) {
        item.category = cat;
      }
      return item;
    });

    this.setState({
      list: [...items],
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
          submitted_answer: this.state.list,
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
    let catItems = {};

    this.state.cat.map((c) => {
      catItems[c] = [];
    });

    console.log(this.state);

    this.state.list.map((i) => {
      catItems[i.category].push(
        <div
          key={i.name}
          onDragStart={(e) => this.onDragStart(e, i.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: "brown" }}
        >
          {i.name}
        </div>
      );
    });
    console.log("finish");

    const catDivs = this.state.cat.map((c) => {
      return (
        <div
          className="droppable"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e) => this.onDrop(e, c)}
        >
          <div className="task-header">{c}</div>
          {catItems[c]}
        </div>
      );
    });

    return (
      <React.Fragment>
        <div class="shadow-lg p-3 mt-10 mb-5 bg-white rounded">
        <div className="container-drag">
          <h2 className="header">Group Words</h2>
          <div>{catDivs}</div>
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

export default GroupWords;
