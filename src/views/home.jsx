import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TopicIcon from "../components/home/topic";

class Home extends Component {
  state = { list : [
    { name: "Vocabulary-I", icon: "icon-vocabulary" },
    { name: "Sentence-I", icon: "icon-sentence" },
    { name: "Vocabulary-II", icon: "icon-vocabulary" },
    { name: "Sentence-II", icon: "icon-sentence" }
  ]};

  render() {
    const listItems = this.state.list.map((item, index) => (
      <Row className="m-4">
        <Col className="d-flex justify-content-center"><TopicIcon icon={item.icon} topicName={item.name}/></Col>
      </Row>
    ))

    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Row>
            <Col className="shadow p-4 m-5 bg-white rounded">
              <Container>
                <Row className="m-4">
                  <Col className="d-flex justify-content-center"><h3>Topics</h3></Col>
                </Row>
                { listItems }
              </Container>
            </Col>
            <Col className="shadow p-4 m-5 bg-white rounded d-flex justify-content-center">
              <h3>Stats</h3>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;
