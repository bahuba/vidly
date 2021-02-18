import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import http from "../services/httpService";

import config from "../config.json";
const authApiEndpoint = config.apiEndpoint + "/auth/";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    console.log("login request submitted: ", this.state.data.username);
    try {
      // auth.loginUser(this.state.data);
      const { data: jwt } = await http.post(authApiEndpoint, {
        email: this.state.data.username,
        password: this.state.data.password,
      });
      localStorage.setItem("token", jwt);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      // this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
    // redirect
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
