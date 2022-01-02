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
import { ThemeContext } from "./../../../contexts/ThemeContext";

class ProjectForm extends Form {
  static contextType = ThemeContext;

  componentDidMount() {
    this.setState({ theme: this.theme });
  }

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

  style = {
    accordionBox: {
      backgroundColor: "transparent",
      border: "solid #c770f0",
      // + this.context.theme.secondary
    },
    headerInDark: {
      color: this.context.theme.tertiary,
    },
  };

  doSubmit = async () => {
    this.props.history.push("/project");
  };

  updateInformationBlock = (informationBlock, index = -1) => {
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
          <p style={this.style.headerInDark}>
            Fill all the details to add Project in Akshar Tool.
          </p>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={12} md={12}>
                {this.renderInput("projectName", "Project Name")}
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingBottom: "35px" }}>
              <Col xs={12} md={6}>
                {this.renderSelect("projectStatus", "Project Status", [
                  { _id: "In Progress", name: "In Progress" },
                  { _id: "Completed", name: "Completed" },
                ])}
              </Col>
              <Col xs={12} md={6}>
                {this.renderInput("description", "Description")}
              </Col>
            </Row>
            <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
              <h6 className="project-sub-heading">
                Add <strong className="purple">Information </strong> as multiple
                Blocks.
              </h6>
            </Row>

            <Row style={{ justifyContent: "left", paddingBottom: "35px" }}>
              <Col md="12">
                {this.state.data.informationBlocks.map((infoBlock, index) => {
                  return (
                    <Accordion style={this.style.accordionBox} key={index}>
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon style={this.style.headerInDark} />
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="project-sub-heading">
                          {infoBlock.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <InformationBlockForm
                          index={index}
                          populate={this.updateInformationBlock}
                        ></InformationBlockForm>
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
                  onClick={() => this.updateInformationBlock({})}
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
