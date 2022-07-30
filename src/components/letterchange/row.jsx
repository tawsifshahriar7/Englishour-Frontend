import React from "react";
// import { InputGroup } from "react-bootstrap";
// import { FormControl } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Sentence(props) {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>{props.sentence}</Col>
          <Col>
            <input
              type="text"
              name="input"
              id={props.id}
              onChange={props.handleChange}
            />
          </Col>
          <Col>{props.result}</Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Sentence;
