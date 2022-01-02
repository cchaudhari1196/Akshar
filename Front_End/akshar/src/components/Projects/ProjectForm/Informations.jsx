import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Joi from "joi-browser";
import { FaPlus, FaTimes } from "react-icons/fa";
import Input from "./../../common/input";

class Informations extends Component {
  state = {
    errors: [],
  };

  schema = {
    description: Joi.string().required(),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.props.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.props.data };
    data[input.name] = input.value;

    this.setState({ errors });
    this.props.updateParent(data, this.props.index);
  };

  render() {
    return (
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Col md="10">
            <Input
              type="text"
              name="description"
              value={this.props.data.description}
              onChange={this.handleChange}
              error={this.state.errors.description}
            />
          </Col>
          <Col md="1">
            <button
              className="btn btn-primary"
              onClick={() => this.props.add(this.props.index)}
            >
              <FaPlus style={{ marginBottom: "2px" }} />
            </button>
          </Col>
          <Col md="1">
            <button
              className="btn btn-primary"
              onClick={() => this.props.remove(this.props.index)}
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
