import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../../Particle";
import ProjectContentFormat from "./ProjectContentFormat";
import ControlledCarousel from "./carousel";
import Contacts from "../../Contacts/Contacts.js";
import Testimonial from "./../../Testimonials/Testimonial";
import {
  projectsData,
  carouselDataProjectOne as carouselData,
} from "./../../../Assets/data/projectsData";

function ProjectDetail(props) {
  var [project, setProject] = useState();
  var [fullowner, setFullowner] = useState();

  const getProject = () => {
    project = projectsData.find((e) => {
      return e.id == props.match.params.id;
    });
    setProject(project);
    return project;
  };

  const generateOwnerString = () => {
    project && project.owner.map((e) => setFullowner(fullowner + ", " + e));
  };

  useEffect(() => {
    getProject();
  }, [project]);

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          <strong className="purple">
            {project ? project.projectName : ""}
          </strong>
        </h1>
        <p style={{ color: "white" }}>Its owned by {generateOwnerString}</p>
        <ControlledCarousel data={carouselData}></ControlledCarousel>
        <Row className="resume">
          <Col md={12} className="resume-left">
            <h3 className="resume-title">Owner</h3>
            <ProjectContentFormat title="Amdocs Development center" />

            <h3 className="resume-title">Highlights</h3>
            <ProjectContentFormat
              title="Installations"
              date="July 2021 - September 2021"
              content={[
                "Installed 2 pool DP",
                "Installed Generation plant for temp use",
                "Installed Solar rooftop plant",
              ]}
            />
          </Col>
        </Row>
      </Container>
      <Testimonial></Testimonial>
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

export default ProjectDetail;
