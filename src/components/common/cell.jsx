import React, { Component } from "react";
import _ from "lodash";

class Cell extends Component {
  render() {
    const { row, column } = this.props;
    return <span>{_.get(row, column.path)}</span>;
  }
}

export default Cell;
