import React, { Component } from "react";
import Form from "./../../common/form";
import { Row, Col, Container, Button } from "react-bootstrap";
import Joi from "joi-browser";
import { FaPlus, FaTimes } from "react-icons/fa";

class Informations extends Form {
  state = {
    data: {
      description: "",
    },
    errors: [],
  };

  schema = {
    description: Joi.string().required(),
  };

  render() {
    return (
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Col md="10">{this.renderInput("description", null)}</Col>
          <Col md="1">
            <button
              className="btn btn-primary"
              onClick={() => this.props.add(this.state.data, this.props.index)}
            >
              <FaPlus style={{ marginBottom: "2px" }} />
            </button>
          </Col>
          <Col md="1">
            <button
              className="btn btn-primary"
              onClick={() =>
                this.props.remove(this.state.data, this.props.index)
              }
            >
              <FaTimes style={{ marginBottom: "2px" }} />
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Informations;
