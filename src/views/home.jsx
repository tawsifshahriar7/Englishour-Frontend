import React, { Component } from "react";
import NavBar from "../components/navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopicIcon from "../components/home/topic";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import trophy from "../img/trophy.png";

function Home() {
  const { state } = useLocation();
  console.log(state);
  if(state===null){
    return <HomeView/>;
  }
  else{
    return <HomeView popup={ state.data }></HomeView>
  }
}

class HomeView extends Component {
  state = {
    selected: null,
    isSelected: false,
    categorySelected: false,
    link: "#",
    list: [],
    categoryList: [],
    selectedCategory: null,
    achievement: false,
  };

  pdata = [
    { day: 1, value: 0 },
    { day: 2, value: 4 },
    { day: 3, value: 7 },
    { day: 4, value: 1 },
    { day: 5, value: 5 },
    { day: 6, value: 3 },
    { day: 7, value: 2 },
  ];

  componentDidMount() {
    axios
      .get("http://localhost:8248/user/getCategories")
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

      if(this.props.popup!==null){
        this.setState({ achievement: this.state.data })
      }
  }

  handleSelect = (e) => {
    const selectedTopic = e.target.id;
    this.setState({
      selected: selectedTopic,
      isSelected: true,
      link: "/exercise/" + selectedTopic,
    });
  };
  handleCategorySelect = (e) => {
    const selectedCategory = e.target.id;
    axios
      .get(
        "http://localhost:8248/user/getTopics?category_id=" + selectedCategory
      )
      .then((res) => {
        this.setState({
          selectedCategory: e.target.id,
          categorySelected: true,
          list: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClose = () => this.setState({ achievement: false });

  render() {
    const listItems = this.state.list.map((item) => (
      <Row className="m-4">
        <Col className="d-flex justify-content-center">
          <TopicIcon
            icon="icon-vocabulary"
            topicName={item.topic_name}
            id={item.topic_id}
            handleClick={this.handleSelect}
          />
        </Col>
      </Row>
    ));
    const categoryItems = this.state.categoryList.map((item) => (
      <Row className="m-4">
        <Col className="d-flex justify-content-center">
          <TopicIcon
            icon="icon-vocabulary"
            topicName={item.category_name}
            id={item.category_id}
            handleClick={this.handleCategorySelect}
          />
        </Col>
      </Row>
    ));
    const categoryChange = this.state.categorySelected ? (
      <Row className="m-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              this.setState({
                categorySelected: false,
                selectedCategory: null,
              });
            }}
          >
            Change Category
          </Button>
        </Col>
      </Row>
    ) : null;

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
                    <h3>
                      {this.state.categorySelected ? "Topics" : "Categories"}
                    </h3>
                  </Col>
                </Row>
                {this.state.categorySelected ? listItems : categoryItems}
              </Container>
              {categoryChange}
              {!this.state.categorySelected ? (
                <Row className="m-4">
                  <Col className="d-flex justify-content-center">
                    <Button variant="primary" size="lg" active>
                      Take Test
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </Col>
            <Col className="shadow p-4 m-5 bg-white rounded d-flex justify-content-center">
              <h3>Stats</h3>
              <LineChart width={600} height={300} data={this.pdata}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="day" />
                <YAxis />
              </LineChart>
            </Col>
          </Row>
        </Container>
        <Modal show={this.state.achievement} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
              }}
              >
                <img src={trophy} style={{ width: "40px", height: "40px"}}></img>
                Achievement Unlocked
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>Exercise - Score</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Home;
