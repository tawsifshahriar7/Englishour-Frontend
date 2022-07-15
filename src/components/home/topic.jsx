import React from "react";
import "./topic.css";

function TopicIcon(props) {
  return (
    <React.Fragment>
        <button className="button"><i className={props.icon}></i> | {props.topicName}</button>
    </React.Fragment>
  );
}

export default TopicIcon;