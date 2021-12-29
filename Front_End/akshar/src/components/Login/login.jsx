import React from "react";
import Joi from "joi-browser";
import Form from "./../common/form";
import auth from "./../../services/authService";
import { Redirect } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { VerticalAlignCenter } from "@material-ui/icons";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

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

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <Container
        fluid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "92vh",
        }}
      >
        <Container>
          <div>
            <h1 style={{ color: "#eaeaea" }}>Login</h1>
            <form
              onSubmit={this.handleSubmit}
              style={{
                textAlign: "-webkit-center",
              }}
            >
              {this.renderInput("username", "Username")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Login")}
            </form>
          </div>
        </Container>
      </Container>
    );
  }
}
export default Login;
