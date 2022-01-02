import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { Row, Col, Container, Button } from "react-bootstrap";
import Informations from "./Informations";

import { ThemeContext } from "../../../contexts/ThemeContext.js";

class InformationBlockForm extends Form {
  static contextType = ThemeContext;

  state = {
    data: {
      id: -1,
      title: "",
      subTitle: "",
      informations: [{ description: "" }],
    },
    errors: {},

    informationCount: 1,
  };

  schema = {
    title: Joi.string().required(),
    subTitle: Joi.string().optional(),
  };

  addBlankInformation = (index) => {
    const data = { ...this.state.data };
    data.informations.splice(index + 1, 0, { description: "" });
    this.setState({ data });
  };

  updateInformation = (information, index) => {
    this.state.data.informations[index] = information;
    this.setState({ data: this.state.data });
  };

  removeInformation = (index) => {
    const data = { ...this.state.data };
    data.informations.splice(index, 1);
    this.setState({ data });
  };

  populateParent = () => {
    this.props.populate(this.state.data, this.props.index);
  };

  render() {
    return (
      <Container fluid>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Col md="6">{this.renderInput("title", "Title")}</Col>
          <Col md="6">{this.renderInput("subTitle", "Sub Title")}</Col>
        </Row>

        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <h6 className="project-sub-heading">
            Add <strong className="purple">bullet points. </strong>
          </h6>
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          {this.state.data.informations.map((info, index) => {
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
