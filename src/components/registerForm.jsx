import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import authService from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .label("Email"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit = async () => {
    // call server
    console.log("registerUser request submitted", this.state.data.username);
    try {
      const response = await userService.registerUser(this.state.data);
      authService.loginUserJwt(response.headers["x-auth-token"]);
      window.location = "/";
      // this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("username", "Username")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
