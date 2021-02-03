import React, { Component } from "react";
import Cell from "./cell";

class TableBody extends Component {
  renderCell = (row, column) => {
    // check if column requires custom rendering
    if (column.code) return column.code(row);
    // basic rendering case:
    return (
      <td key={row._id + (column.path || column.key)}>
        <Cell row={row} column={column} />
      </td>
    );
  };

  render() {
    const { rows, columns } = this.props;

    return (
      <tbody>
        {rows.map((row) => (
          <tr key={row._id}>
            {columns.map((column) => this.renderCell(row, column))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
