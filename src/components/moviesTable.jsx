import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Like from "./common/like";
import Table from "./common/table";
import { NavLink } from "react-router-dom";

class MoviesTable extends Component {
  getMovieUrl = (movie) => {
    return "/movie/" + movie._id;
  };

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    const columns = [
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
              onClick={() => onLike(movie)}
              item={movie}
              liked={movie.liked}
            />
          </td>
        ),
      },
      {
        key: "delete",
        code: (movie) => (
          <td key={movie._id + "delete"}>
            <button
              onClick={() => onDelete(movie._id)}
              className="btn-sm btn-danger"
            >
              Delete
            </button>
          </td>
        ),
      },
    ];

    return (
      <Table
        items={movies}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        onLike={onLike}
        onDelete={onLike}
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
