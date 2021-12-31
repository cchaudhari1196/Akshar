import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { Container, Row, Col, Button } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InformationBlockForm from "./InformationBlock";

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
          title: "Information Block 1",
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

  addInformationBlock = (informationBlock, index = -1) => {
    const data = { ...this.state.data };
    if (index == -1) {
      data.informationBlocks.push({
        title: "Information Block " + (data.informationBlocks.length + 1),
      });
    } else {
      data.informationBlocks[index] = informationBlock;
    }
    this.setState({ data });
  };

  render() {
    return (
      <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            Add <strong className="purple">Project </strong>
          </h1>
          <p style={{ color: "white" }}>
            Fill all the details to add Project in Akshar Tool.
          </p>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={12} md={12}>
                {this.renderInput("projectName", "projectName")}
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingBottom: "35px" }}>
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

            <Row style={{ justifyContent: "left", paddingBottom: "35px" }}>
              <Col md="12">
                {this.state.data.informationBlocks.map((infoBlock, index) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{infoBlock.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <InformationBlockForm
                            index={index}
                            add={this.addInformationBlock}
                          ></InformationBlockForm>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Col>
            </Row>
            <Row style={{ justifyContent: "left", paddingBottom: "35px" }}>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => this.addInformationBlock({})}
                >
                  Add More Information
                </Button>
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingBottom: "35px" }}>
              {this.renderButton("Save")}
            </Row>
          </form>
        </Container>
      </Container>
    );
  }
}

export default ProjectForm;
