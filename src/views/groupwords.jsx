import React, { Component } from "react";
import "../styles/groupWord.css";
import NavBar from "../components/navbar";

class GroupWords extends Component {
  state = {
    list: [
      { name: "Word 1", category: "Cat0" },
      { name: "Word 2", category: "Cat0" },
      { name: "Word 3", category: "Cat0" },
      { name: "Word 4", category: "Cat0" },
      { name: "Word 5", category: "Cat0" },
    ],
    cat: ["Cat0", "Cat1", "Cat2", "Cat3"]
  };

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    
    let items = this.state.list.filter((item) => {
        if (item.name == id) {
            item.category = cat;
        }
        return item;
    });

    this.setState({
        list: [...items]
    });
 }

  render() {
    let catItems = {};

    this.state.cat.map((c) => {
        catItems[c] = [];
    });

    console.log(this.state);

    this.state.list.map((i) => {
        catItems[i.category].push(
            <div key={i.name}
                 onDragStart = {(e) => this.onDragStart(e, i.name)}
                 draggable
                 className="draggable"
                 style={{backgroundColor: "yellow"}}>
                {i.name}
            </div>
        );
    });
    console.log("finish")

    const catDivs = this.state.cat.map((c) => {
        return (
          <div className="droppable" 
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>this.onDrop(e, c)}>
              <span className="task-header">{c}</span>
              {catItems[c]}
          </div>
        );
    });

    return (
      <React.Fragment>
        <NavBar />
        <div className="container-drag">
          <h2 className="header">Group Words</h2>
          <div className="category-container">
            {catDivs}
          </div>
        </div>
        <h1>GroupWords</h1>
      </React.Fragment>
    );
  }
}

export default GroupWords;