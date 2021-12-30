import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import { Container, Row, Col } from "react-bootstrap";

class ProjectForm extends Form {
  state = {
    data: {
      id: -1,
      projectName: "",
      description: "",
      projectStatus: "",
      imageGroup: {
        id: -1,
        name: "",
        images: [
          {
            id: -1,
            name: "",
            address: "",
            description: "",
          },
        ],
      },
      informationBlocks: [
        {
          id: -1,
          title: "",
          subInformationBlocks: [
            {
              id: -1,
              title: "",
              subTitle: "",
              informations: [
                { id: -1, description: "" },
                { id: -1, description: "" },
                { id: -1, description: "" },
              ],
            },
          ],
        },
      ],
    },
    errors: {},
  };

  schema = {
    projectName: Joi.string(),
    description: Joi.string().required().label("description"),
    projectStatus: Joi.string().required().label("projectStatus"),
    imageGroup: Joi.object().keys({
      name: Joi.string().label("name"),
      images: Joi.array().min(1),
    }),
    informationBlocks: Joi.array().min(1),
  };

  doSubmit = async () => {
    this.props.history.push("/project");
  };

  render() {
    return (
      <Container fluid className="project-section">
        <Container>
          <h1>Movie Form</h1>
          <form onSubmit={this.handleSubmit}>
            <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
              <Col xs={12} md={12}>
                {this.renderInput("projectName", "projectName")}
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
              <Col xs={12} md={6}>
                {this.renderSelect("projectStatus", "projectStatus", [
                  { _id: "In Progress", name: "In Progress" },
                  { _id: "Completed", name: "Completed" },
                ])}
              </Col>
              <Col xs={12} md={6}>
                {this.renderInput("description", "description")}
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
              {this.renderButton("Save")}
            </Row>
          </form>
        </Container>
      </Container>
    );
  }
}

export default ProjectForm;
