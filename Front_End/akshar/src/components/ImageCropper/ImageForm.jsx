import Joi from "joi-browser";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Input from "../common/input";

class ImageForm extends Component {
  state = {
    data: {
      name: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required(),
    description: Joi.string(),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ errors, data });

    this.props.populateImageDetails({ imageDetails: data });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    return (
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Col md="6">
            <Input
              type="text"
              name="name"
              label="Name"
              onChange={this.handleChange}
              error={this.state.errors.title}
            />
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="description"
              label="Description"
              onChange={this.handleChange}
              error={this.state.errors.subTitle}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ImageForm;
