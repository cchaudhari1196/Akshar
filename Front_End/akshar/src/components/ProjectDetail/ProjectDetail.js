import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import ProjectContentFormat from "./ProjectContentFormat";
import axios from "axios";
import pdf from "../../Assets/Soumyajit-Behera.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import "react-slideshow-image/dist/styles.css";
import ControlledCarousel from "./carousel";
import Contacts from "../Contacts/Contacts.js";

function ProjectDetail() {
  const uri = "https://porfolio-backend.vercel.app/ranks/getRanks";
  const [spojRank, upadteSpojRank] = useState(0);
  const [hackerrank, upadteHackerank] = useState(0);
  const [sem, upadateSem] = useState(0);
  const [cgpa, upadteCgpa] = useState(0);

  useEffect(() => {
    axios
      .get(uri)
      .then((res) => {
        upadteSpojRank(res.data.message[0].spojRank);
        upadteHackerank(res.data.message[1].hackerrank);
        upadteCgpa(res.data.message[2].cgpa);
        upadateSem(res.data.message[3].sem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const carouselData = [
    {
      id: 1,
      url: "https://cdn.pixabay.com/photo/2017/06/01/22/42/chain-2364830__340.jpg",
      name: "abstarctImage",
      header: "Look at the chain",
      subHeader: "Its lloking like someone got eyes oon that thing.",
    },
    {
      id: 2,
      url: "https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964__340.jpg",
      name: "boyImage",
      header: "Boy looking cute",
      subHeader:
        "Its a image of boy who is waitng for his father to come home.",
    },
    {
      id: 3,
      url: "https://cdn.pixabay.com/photo/2016/08/12/14/25/abstract-1588720__340.jpg",
      name: "virus",
      header: "OMG! its that virus",
      subHeader: "Virus has made world to beg for mercy.",
    },
    {
      id: 4,
      url: "https://cdn.pixabay.com/photo/2016/11/30/20/44/computer-1873831__340.png",
      name: "Code",
      header: "Future in progress",
      subHeader: "Coding is very interesting field of work.",
    },
  ];

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>Its owned by .</p>
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
