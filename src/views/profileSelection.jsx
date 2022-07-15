import React, { Component } from "react";
import "../styles/profileSelection.css";

class Selection extends Component {
  state = { list: [
    "Profile 1",
    "Profile 2",
    "Profile 3"
  ]};

  render() {
    const listItems = this.state.list.map((item, index) => (
        <button type="button" class="btn btn-primary profile-btn">{item}</button>
    ))

    return (
      <React.Fragment>
        <br />
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <h3>Select Profile</h3>
        </div>
        <div className="parent">
            <div class="btn-group-vertical">
                { listItems }
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Selection;
