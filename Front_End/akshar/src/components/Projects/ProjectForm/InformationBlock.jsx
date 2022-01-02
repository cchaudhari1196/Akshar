import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { Row, Col, Container, Button } from "react-bootstrap";
import Informations from "./Informations";

import { ThemeContext } from "../../../contexts/ThemeContext.js";
import Input from "./../../common/input";

class InformationBlockForm extends React.Component {
  static contextType = ThemeContext;

  state = {
    errors: {},
  };

  schema = {
    title: Joi.string().required(),
    subTitle: Joi.string().optional(),
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

    this.populateParent(data);
  };

  addBlankInformation = (index) => {
    const data = { ...this.props.data };
    data.informations.splice(index + 1, 0, {
      description: "",
    });
    this.populateParent(data);
  };

  updateInformation = (information, index) => {
    this.props.data.informations[index] = information;
    this.populateParent(this.props.data);
  };

  removeInformation = (index) => {
    const data = { ...this.props.data };
    data.informations.splice(index, 1);
    this.populateParent(data);
  };

  populateParent = (data) => {
    this.props.populate(data, this.props.index);
  };

  render() {
    return (
      <Container fluid>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Col md="6">
            <Input
              type="text"
              name="title"
              value={this.props.data.title}
              label="Title"
              onChange={this.handleChange}
              error={this.state.errors.title}
            />
          </Col>
          <Col md="6">
            <Input
              type="text"
              name="subTitle"
              value={this.props.data.subTitle}
              label="Sub Title"
              onChange={this.handleChange}
              error={this.state.errors.subTitle}
            />
          </Col>
        </Row>

        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <h6 className="project-sub-heading">
            Add <strong className="purple">bullet points. </strong>
          </h6>
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          {this.props.data.informations.map((info, index) => {
            return (
              <Informations
                key={index}
                add={this.addBlankInformation}
                remove={this.removeInformation}
                updateParent={this.updateInformation}
                index={index}
                data={info}
              ></Informations>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default InformationBlockForm;
