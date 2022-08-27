import React from "react";
import "../../styles/footerStyle.css";

function CorrectFooter(props) {
  return (
    <React.Fragment>
      <div className="footer-correct">
        <p>Correct</p>
      </div>
    </React.Fragment>
  );
}

function WrongFooter(props) {
    return (
      <React.Fragment>
        <div className="footer-wrong">
          <p>Wrong</p>
        </div>
      </React.Fragment>
    );
  }

export {CorrectFooter, WrongFooter};