import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Particle from "../../Particle";
import ControlledCarousel from "./carousel";
import Contacts from "../../Contacts/Contacts.js";
import Testimonial from "./../../Testimonials/Testimonial";
import ProjectContentFormat from "./ProjectContentFormat";
import { getProject } from "../../../services/projectService";

class ProjectDetail extends React.Component {
  state = {
    data: {
      projectName: "",
      description: "",
      projectStatus: "",
      owner: "",
      images: [
        // {
        //   id: -1,
        //   name: "",
        //   address: "",
        //   description: "",
        // },
      ],
      informationBlocks: [
        {
          title: "",
          subTitle: "",
          informations: [{ description: "" }],
        },
      ],
      reviews: [{}],
    },
  };

  async componentDidMount() {
    const { data: project } = await getProject(this.props.match.params.id);
    this.setState({ data: this.mapToViewModel(project) });
  }

  mapToViewModel = (project) => {
    return {
      id: project.id,
      projectName: project.projectName,
      owner: project ? project.owner : "",
      images: project ? project.imageGroup.images : [],
      informationBlocks: project.informationBlocks
        ? project.informationBlocks[0].subInformationBlocks
        : [],
      reviews: project.reviews ? project.reviews : [],
    };
  };

  render() {
    const { data } = this.state;
    return (
      <Container fluid className="resume-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            <strong className="purple">{data.projectName}</strong>
          </h1>
          <p style={{ color: "white" }}>Its owned by {data.owner}</p>
          <ControlledCarousel data={data.images}></ControlledCarousel>
          <Row className="resume">
            <Col md={12} className="resume-left">
              {/* <h3 className="resume-title">Owner</h3>
              <ProjectContentFormat title="Amdocs Development center" /> */}

              {data.informationBlocks.map((informationBlock) => (
                <React.Fragment>
                  <h4 className="resume-title">{informationBlock.title}</h4>
                  <ProjectContentFormat
                    title={informationBlock.subTitle}
                    // date="July 2021 - September 2021"
                    content={informationBlock.informations}
                  />
                </React.Fragment>
              ))}
            </Col>
          </Row>
        </Container>
        <Testimonial list={data.reviews}></Testimonial>
        <Container style={{ marginTop: "5%" }}>
          <h1 className="project-heading">
            <strong className="purple">Contact Us </strong>
          </h1>
          <p style={{ color: "white" }}>Have a similar Project in Mind?</p>
        </Container>
        <Contacts></Contacts>
      </Container>
    );
  }
}

export default ProjectDetail;
