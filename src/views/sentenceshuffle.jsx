import React, { Component } from "react";
import NavBar from "../components/navbar";

class SentenceShuffle extends Component {
  state = { list : ['Word 1','Word 2','Word 3','Word 4','Word 5']};
  dragItem = React.createRef();
  dragOverItem = React.createRef();

  dragStart = (e, position) => {
    this.dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  dragEnter = (e, position) => {
    this.dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  drop = (e) => {
    const copyListItems = [...this.state.list];
    const dragItemContent = copyListItems[this.dragItem.current];
    copyListItems.splice(this.dragItem.current, 1);
    copyListItems.splice(this.dragOverItem.current, 0, dragItemContent);
    this.dragItem.current = null;
    this.dragOverItem.current = null;
    this.setState({list : copyListItems});
  };
  
  render() {
    const listItems = this.state.list.map((item, index) => (
      <div style={{backgroundColor:'lightblue', margin:'2px', width: '10%', textAlign:'center', fontSize:'20px'}}
        onDragStart={(e) => this.dragStart(e,index)}
        onDragEnter={(e) => this.dragEnter(e,index)}
        onDragEnd={this.drop}
        key={index}
        draggable>
          {item}
      </div>
    ))

    return (
      <React.Fragment>
        <NavBar />
        <h1>SentenceShuffle</h1>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
          { listItems }
        </div>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
          <button>Submit</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SentenceShuffle;
