import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";
import { Row, Col, Container, Button } from "react-bootstrap";
import Informations from "./Informations";

class InformationBlockForm extends Form {
  state = {
    data: {
      id: -1,
      title: "",
      subTitle: "",
      informations: [{ id: -1, description: "" }],
    },
    errors: {},

    informationCount: 1,
  };

  schema = {
    title: Joi.string().required(),
    subTitle: Joi.string().optional(),
  };

  addInformation = (information, index) => {
    const data = { ...this.state.data };
    data.informations.splice(index, 0, information);
    this.setState({ data });
  };

  removeInformation = (index) => {
    const data = { ...this.state.data };
    data.informations.splice(index, 1);
    this.setState({ data });
  };

  render() {
    return (
      <Container fluid>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Col md="6">
            <h5>{this.renderInput("title", "Title")}</h5>
          </Col>
          <Col md="6">{this.renderInput("subTitle", "Sub Title")}</Col>
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          {this.state.data.informations.map((info, index) => {
            return (
              <Informations
                add={this.addInformation}
                remove={this.removeInformation}
                index={index}
                data={info}
              ></Informations>
            );
          })}
        </Row>
        <Row style={{ justifyContent: "center", paddingBottom: "0.5rem" }}>
          <Button
            onClick={() => this.props.add(this.state.data, this.props.index)}
          >
            Save
          </Button>
        </Row>
      </Container>
    );
  }
}

export default InformationBlockForm;
