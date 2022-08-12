import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopicIcon from "../components/home/topic";
import { Navigate } from "react-router-dom";

class Home extends Component {
  state = {
    selected: null,
    isSelected: false,
    link: "#",
    list: [
      { name: "Vocabulary-I", icon: "icon-vocabulary" },
      { name: "Sentence-I", icon: "icon-sentence" },
      { name: "Vocabulary-II", icon: "icon-vocabulary" },
      { name: "Sentence-II", icon: "icon-sentence" },
    ],
  };
  handleSelect = (e) => {
    this.setState({
      selected: e.target.id,
      isSelected: true,
      link: "/exercise/1",
    });
  };
  render() {
    const listItems = this.state.list.map((item, index) => (
      <Row className="m-4">
        <Col className="d-flex justify-content-center">
          <TopicIcon
            icon={item.icon}
            topicName={item.name}
            id={index}
            handleClick={this.handleSelect}
          />
        </Col>
      </Row>
    ));
    return (
      <React.Fragment>
        {this.state.isSelected && (
          <Navigate to={this.state.link} replace={true} />
        )}
        <NavBar />
        <Container>
          <Row>
            <Col className="shadow p-4 m-5 bg-white rounded">
              <Container>
                <Row className="m-4">
                  <Col className="d-flex justify-content-center">
                    <h3>Topics</h3>
                  </Col>
                </Row>
                {listItems}
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
