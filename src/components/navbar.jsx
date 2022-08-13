import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../logo.png";
import Cookie from "universal-cookie";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

class NavBar extends Component {
  state = { isLoggedIn: false, searchbox: null, searchResult: null };
  componentDidMount() {
    var cookie = new Cookie();
    if (cookie.get("x-access-token")) {
      this.setState({ isLoggedIn: true });
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    var cookie = new Cookie();
    const word = this.state.searchbox;
    if (word) {
      axios
        .get(`http://localhost:8248/user/search?word=${word}`, {
          headers: {
            "x-access-token": cookie.get("x-access-token"),
            "profile-access-token": cookie.get("profile-access-token"),
          },
        })
        .then((res) => {
          console.log(res.data.synonyms);
          this.setState({ searchResult: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  handleSearchBoxChange = (e) => {
    this.setState({ searchbox: e.target.value });
  };

  renderSearchResult = () => {
    if (this.state.searchResult) {
      let synonyms = this.state.searchResult.synonyms.map((synonym) => (
        <li>{synonym}</li>
      ));
      return (
        <div className="search-result">
          <h6>{this.state.searchResult.word}</h6>
          <p>
            <strong>Meaning: </strong>
            {this.state.searchResult.definition}
          </p>
          <p>
            <strong>Phonetics: </strong>
            {this.state.searchResult.phonetics}
          </p>
          <p>
            <strong>Example: </strong>
            {this.state.searchResult.example}
          </p>
          <p>
            <strong>Synonyms: </strong>
            <ul>{synonyms}</ul>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    let notifications, profile;
    if (this.state.isLoggedIn) {
      notifications = <Nav.Link href="#notifications">Notifications</Nav.Link>;
      profile = <Nav.Link href="/profile">Profile</Nav.Link>;
    }

    let search = (
      <div>
        <OverlayTrigger
          trigger="click"
          key="borrom"
          placement="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Header as="h3">Search Word</Popover.Header>
              <Popover.Body>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Word"
                    aria-label="Word"
                    aria-describedby="basic-addon2"
                    onChange={this.handleSearchBoxChange}
                  />
                  <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={this.handleSearch}
                  >
                    Search
                  </Button>
                </InputGroup>
                <p>{this.renderSearchResult()}</p>
              </Popover.Body>
            </Popover>
          }
        >
          <Button variant="secondary">Search</Button>
        </OverlayTrigger>
      </div>
    );

    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href={this.state.isLoggedIn ? "/home" : "/"}>
            <img
              src={logo}
              width="90"
              height="30"
              className="d-inline-block align-top"
              alt="Englishour logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {search}
              {notifications}
              {profile}
              <Nav.Link href={this.state.isLoggedIn ? "/logout" : "/login"}>
                {this.state.isLoggedIn ? "Logout" : "Login"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
