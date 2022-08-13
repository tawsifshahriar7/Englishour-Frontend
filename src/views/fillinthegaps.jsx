import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Cookie from "universal-cookie";
import { Navigate } from "react-router-dom";
import "../styles/fillinblank.css"

class FillInTheGaps extends Component {

  state = {
    clueList: [] ,
    sentenceList: [],
    submission: [],
    result: null,
    originalClueList: []
  };

  dragItem = React.createRef();
  dragOverItem = React.createRef();


  componentDidMount() {
    var cookie = new Cookie();
    axios
      .get(
        "http://localhost:8248/user/fillinthegaps?exercise_id=1", 
        //+ this.props.exercise_id,
        {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        }
      )
      .then((res) => {
        console.log("pasage : "+res.data);
        
        // const len = res.data.length;
        // for (let i = 0; i < len; i++) {
        //   this.state.input.push("####");
        // }
        
        let s=res.data;
        let v=[],w=[];
         let g="";

 for(let i=0;i<s.length;i++){
     
    if(s[i]!=='(' && s[i]!==')'){
        g+=s[i]; //console.log(s[i]);
        
    }
 else if(s[i]==='('){
       v.push(g);
            g="";
    }
else{
     w.push(g); g="";
    }
    //console.log(g);
    }
 
//console.log("v : "+v);
 
 
//console.log("w :"+w);
this.setState({
  originalClueList: w,
  sentenceList:v,
  clueList: this.shuffle(w)
});
      

      })
      .catch((err) => {
        console.log(err);
      });
  }

  dragOver = (ev, position) => {
    ev.preventDefault();
    this.dragOverItem.current = position;
    console.log("drag over blank : ",position)
  }

  drag = (ev, position) => {
    ev.dataTransfer.setData("Text", ev.target.id);
    this.dragItem.current = position;
    console.log("drag of clue : ",position)
  }

  drop = (ev) => {
    console.log("dropped")
    var data = ev.dataTransfer.getData("Text");
    ev.target.parentNode.replaceChild(document.getElementById(data), ev.target);
    document.getElementById(data).className = "blankText";
    
    let  answers = [...this.state.submission];
    let currentItem = this.dragOverItem.current + "#" +  this.dragItem.current;
    answers.push(currentItem)
    //console.log(answers);
    this.setState({ submission: answers });

  }

   shuffle = (originalArray)=> {
    var array = [].concat(originalArray);
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

   
  handleTryAgain =(e)=>{

    window.location.reload(true);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.submission)
    let count=0;
    for(let i=0;i<this.state.originalClueList.length;i++){

      let text = this.state.submission[i];
      const myArray = text.split("#");
      
      console.log("expected :"+this.state.originalClueList[myArray[0]]);
      console.log("found :"+this.state.clueList[myArray[1]]);

      if(this.state.originalClueList[myArray[0]]===this.state.clueList[myArray[1]]){
        console.log("matched");
        count++;
      }else {
        console.log("un-matched");
      }
    
      
    }

    if(count===this.state.originalClueList.length){
      this.setState({ result: true });
    }
    else this.setState({ result: false });




 
    // var cookie = new Cookie();
    // axios
    //   .post(
    //     "http://localhost:8248/user/submitExercise",
    //     {
    //       exercise_id: 1,
    //       submitted_answer: this.state.submission,
    //     },
    //     {
    //       headers: {
    //         "x-access-token": cookie.get("x-access-token"),
    //         "profile-access-token": cookie.get("profile-access-token"),
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     this.setState({ result: res.data[0].result });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };


  render() {
    const clues = this.state.clueList.map((item, index) => (

      <span class="draggable" id={index} draggable onDragStart={(e) => this.drag(e,index)}>{item}</span>
    
      ));

    const partialSentences = this.state.sentenceList.map((item, index) => (

      <span>
        {item}
        <span droppable id={index} onDrop={(e) => this.drop(e)} onDragOver={(e) => this.dragOver(e,index)}> _________ </span>
      </span>

    ));

    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <h3 style={{ textAlign: "center" }}>
            Fill in the Blanks to Complete the Paragraph
          </h3>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {clues}
          </div>
          <br />

          <div align="center">

            <br />
            {partialSentences}
          </div>


          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button onClick={this.handleSubmit}>Submit</button>
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
            {this.state.result === true ? (
              <div>
                <h3>Correct!</h3>
                <br />
                <button>Next</button>
              </div>
            ) : this.state.result === false ? (
              <div>
                <h3>Wrong!</h3>
                <br />
                <button  onClick={(event) => this.handleTryAgain(event)}>Try Again   </button>
              </div>
            ) : null}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default FillInTheGaps;
