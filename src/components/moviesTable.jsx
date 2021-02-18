import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { PropTypes } from "prop-types";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      key: "title",
      code: (movie) => (
        <td key={movie._id + "title"}>
          <NavLink to={this.getMovieUrl(movie)}>{movie.title}</NavLink>
        </td>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      code: (movie) => (
        <td key={movie._id + "like"}>
          <Like
            onClick={() => this.props.onLike(movie)}
            item={movie}
            liked={movie.liked}
          />
        </td>
      ),
    },
  ];

  deleteCol = {
    key: "delete",
    code: (movie) => (
      <td key={movie._id + "delete"}>
        <button
          onClick={() => this.props.onDelete(movie._id)}
          className="btn-sm btn-danger"
        >
          Delete
        </button>
      </td>
    ),
  };

  getMovieUrl = (movie) => {
    return "/movie/" + movie._id;
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteCol);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        items={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

MoviesTable.propTypes = {
  movies: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortColumn: PropTypes.object.isRequired,
};

export default MoviesTable;
