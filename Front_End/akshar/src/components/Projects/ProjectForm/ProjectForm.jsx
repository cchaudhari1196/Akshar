import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Joi from "joi-browser";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { ImageListItemBar } from "@material-ui/core";

import addImageIcon from "../../../Assets/addImageIcon.png";
import ImageUpload from "./../../ImageCropper/imageUpload";
import InformationBlockForm from "./InformationBlock";
import Form from "../../common/form";
import { ThemeContext } from "./../../../contexts/ThemeContext";
import { styles } from "./ImageHoverEffect.css";
import {
  createProject,
  updateProject,
  uploadImage,
  deleteImage,
  getProject,
} from "./../../../services/projectService";
import { FaTrash } from "react-icons/fa";
import ImageCropper from "../../ImageCropper/imageCropper";

class ProjectForm extends Form {
  static contextType = ThemeContext;

  componentDidMount() {
    this.setState({ theme: this.context });
  }

  state = {
    data: {
      projectName: "",
      description: "",
      projectStatus: "",
      owner: "",
      imageGroup: {
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
          // this title will be taken from sub information block
          title: "Information Block 1",
          // Only one subblock will be there for now.
          subInformationBlocks: [
            {
              title: "",
              subTitle: "",
              informations: [{ description: "" }],
            },
          ],
        },
      ],
    },
    errors: {},
    isUpdate: false,
    theme: {},
  };

  async componentDidMount() {
    await this.populateProject();
  }

  async populateProject() {
    const id = this.props.match.params.id;
    if (id) {
      const { data } = await getProject(id);
      this.setState({ data, isUpdate: true });
    }
  }

  schema = {
    projectName: Joi.string(),
    description: Joi.string().required().label("description"),
    owner: Joi.string().required().label("owner"),
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
    try {
      const { data } = this.state;
      if (this.state.isUpdate == true) {
        await updateProject(data);
      } else {
        await createProject(data);
      }

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  updateInformationBlock = (informationBlock, index = -1) => {
    const data = { ...this.state.data };
    if (index == -1) {
      data.informationBlocks[0].subInformationBlocks.push({
        title: "Information Block " + (data.informationBlocks.length + 1),
        subTitle: "",
        informations: [{ description: "From Project Form " }],
      });
    } else {
      data.informationBlocks[0].subInformationBlocks[index] = informationBlock;
    }
    this.setState({ data });
  };

  addImage = async ({ image, name, description }) => {
    try {
      var { url } = await this.uploadImage(image, name);
    } catch (ex) {
      if (ex.response) {
        toast.error(ex.response.data);
        return;
      }
    }
    let data = { ...this.state.data };
    data.imageGroup.name = data.projectName + " Image group.";
    data.imageGroup.images.push({ address: url, name, description });
    this.setState(data);
  };

  uploadImage = async (imageBlobUrl, imageName) => {
    const formData = new FormData();
    let blob = await fetch(imageBlobUrl).then((r) => r.blob());
    var file = new File([blob], imageName);
    formData.append("file", file);

    let res = await uploadImage(formData);
    return res.data;
  };

  async deleteAndRemoveImage(url) {
    let data = { ...this.state.data };
    const imgs = data.imageGroup.images.filter((img) => {
      return img.address != url;
    });
    data.imageGroup.images = imgs;
    this.setState({ data });
    deleteImage(url);
  }

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
              <Col xs={6} md={6}>
                {this.renderInput("projectName", "Project Name")}
              </Col>
              <Col xs={6} md={6}>
                {this.renderInput("owner", "Owner")}
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
                {this.state.data.informationBlocks[0].subInformationBlocks.map(
                  (infoBlock, index) => {
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
                            data={infoBlock}
                            populate={this.updateInformationBlock}
                          ></InformationBlockForm>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                )}
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
                  <ImageListItem key={item.address} className="imgContainer">
                    <img
                      src={item.address}
                      className="img"
                      alt={item.title}
                      loading="lazy"
                    />
                    {/* <div className="middle">
                      <button
                        className="btn btn-primary"
                        onClick={() => this.deleteAndRemoveImage(item.address)}
                      >
                        Delete
                      </button>
                      </div> */}

                    <ImageListItemBar
                      title={item.name}
                      subtitle={item.description}
                      actionIcon={
                        <React.Fragment>
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.description}`}
                          >
                            <DownloadIcon></DownloadIcon>
                          </IconButton>
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${item.description}`}
                            onClick={() =>
                              this.deleteAndRemoveImage(item.address)
                            }
                          >
                            <DeleteIcon></DeleteIcon>
                          </IconButton>
                        </React.Fragment>
                      }
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

export default ProjectForm;
