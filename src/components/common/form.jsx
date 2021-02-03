// @ts-check
import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };
  schema = {};

  validateInput = (input) => {
    // console.log(input);

    const obj = { [input.name]: input.value };
    const schema = { [input.name]: this.schema[input.name] };

    const result = Joi.validate(obj, schema);

    return result.error ? result.error.details[0].message : null;
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (result.error === null) return null;
    // result.error will be non null if there is a validation error

    const errors = { ...this.state.errors };

    result.error.details.map(
      (detail) => (errors[detail.path] = detail.message)
    );

    return errors;
  };

  doSubmit() {
    // function can be optionally overridden by superclass
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors ? errors : {} });
    // if (errors) {
    //   console.log("Validation error: ", errors);
    //   return;
    // }

    this.doSubmit();
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };

    const errorMessage = this.validateInput(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.validate() ? true : false}
        type="submit"
        className="btn btn-primary"
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
