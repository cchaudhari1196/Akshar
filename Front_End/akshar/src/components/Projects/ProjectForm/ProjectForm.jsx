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
import Cropper from "react-easy-crop";
import ImageUpload from "./../../ImageCropper/imageUpload";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import addImageIcon from "../../../Assets/addImageIcon.png";

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
          // {
          //   id: -1,
          //   name: "",
          //   address: "",
          //   description: "",
          // },
        ],
      },
      informationBlocks: [
        {
          id: -1,
          // this title will be taken from sub information block
          title: "Information Block 1",
          // Only one subblock will be there for now.
          subInformationBlocks: [
            {
              id: -1,
              title: "",
              subTitle: "",
              informations: [{ id: -1, description: "" }],
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

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  updateInformationBlock = (informationBlock, index = -1) => {
    const data = { ...this.state.data };
    if (index == -1) {
      data.informationBlocks.push({
        title: "Information Block " + (data.informationBlocks.length + 1),
        subInformationBlocks: [
          {
            id: -1,
            title: "",
            subTitle: "",
            informations: [{ description: "From Project Form " }],
          },
        ],
      });
    } else {
      data.informationBlocks[index].subInformationBlocks[0] = informationBlock;
    }
    this.setState({ data });
  };

  addImage = (address) => {
    let data = { ...this.state.data };
    data.imageGroup.images.push({ address });
    this.setState(data);
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
                          data={infoBlock.subInformationBlocks[0]}
                          populate={this.updateInformationBlock}
                        ></InformationBlockForm>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Col>
            </Row>
            <Row style={{ textAlign: "right", paddingBottom: "35px" }}>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => this.updateInformationBlock({})}
                >
                  Add More Information
                </Button>
              </Col>
            </Row>

            <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
              <h6 className="project-sub-heading">
                Add <strong className="purple">Images </strong> for Carousal
                Blocks.
              </h6>
            </Row>
            <Row>
              <ImageList
                sx={{ width: "100%", height: "50%" }}
                cols={3}
                rowHeight={164}
              >
                {this.state.data.imageGroup.images.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={item.address}
                      // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
                <ImageListItem>
                  <ImageUpload add={this.addImage} id="file-input" />
                  <label htmlFor="file-input">
                    <img
                      src={addImageIcon}
                      style={{
                        paddingLeft: "20%",
                        paddingRight: "20%",
                        overflow: "hidden",
                        height: "164px",
                        cursor: "pointer",
                        border: "solid #c770f0",
                      }}
                      alt="Add Image"
                      loading="lazy"
                    />
                  </label>
                </ImageListItem>
              </ImageList>
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
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
];

export default ProjectForm;
