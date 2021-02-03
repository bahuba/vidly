import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { PropTypes } from "prop-types";

const Table = (props) => {
  const { items, columns, sortColumn, onSort } = props;

  return (
    <table className="table table-striped">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody rows={items} columns={columns} />
    </table>
  );
};

Table.propTypes = {
  items: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
