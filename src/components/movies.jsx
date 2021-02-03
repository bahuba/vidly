import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Search from "./common/search";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    searchText: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: -1, name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({
      movies: movies,
      genres: genres,
      selectedGenre: genres[0],
    });
  }

  handleDelete = async (movieId) => {
    console.log("handleDelete called", movieId);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movieId);
    console.log(movies);
    this.setState({ movies });

    try {
      await deleteMovie(movieId);
    } catch (ex) {
      console.log("Exception while deleting movieId: ", movieId);
      if (ex.response && ex.response.status === 404) {
        toast.error("Delete failed on movie with Id: ", movieId);
      }
      this.setState({ originalMovies });
    }
  };

  handleLike = (movie) => {
    console.log("toggle liked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenresChange = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  paginateMovies = (movies) => {
    const startIndex = (this.state.currentPage - 1) * this.state.pageSize;
    const endIndex = startIndex + this.state.pageSize;
    return movies.slice(startIndex, endIndex);
  };

  filterMoviesByGenre = (movies, genre) => {
    if (genre == null) return movies;
    if (genre._id === -1) return movies;

    return movies.filter((movie) => movie.genre._id === genre._id);
  };

  sortMovies = (movies) => {
    return _.orderBy(
      movies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
  };

  filterMoviesBySearch = (movies) => {
    if (this.state.searchText === "") return movies;

    return movies.filter((m) =>
      m.title.toUpperCase().includes(this.state.searchText.toUpperCase())
    );
  };

  getPagedMovies = () => {
    let filteredMovies = this.filterMoviesByGenre(
      this.state.movies,
      this.state.selectedGenre
    );

    filteredMovies = this.filterMoviesBySearch(filteredMovies);

    const sortedMovies = this.sortMovies(filteredMovies);
    const { length: count } = filteredMovies;
    const movies = this.paginateMovies(sortedMovies);

    return { count, movies };
  };

  handleNewMovie = () => {
    this.props.history.push("/movie/new");
  };

  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchText: query, currentPage: 1 });
  };

  // handleSearchOnFocus = () => {
  //   if (this.state.searchText === searchLabel)
  //     this.setState({ selectedGenre: null, searchText: "" });
  // };

  // handleSearchOnBlur = () => {
  //   this.setState({ selectedGenre: null, searchText: searchLabel });
  // };

  renderTable() {
    const { count, movies } = this.getPagedMovies();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenresChange}
            />
          </div>
          <div className="col">
            <button onClick={this.handleNewMovie} className="btn btn-primary">
              New Movie
            </button>
            <h5 style={{ padding: "10px 0px 10px 0px" }}>
              Showing {count} movies in the database.
            </h5>
            <Search
              value={this.state.searchText}
              onChange={this.handleSearch}
              // onFocus={this.handleSearchOnFocus}
              // onBlur={this.handleSearchOnBlur}
            />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              onPageChanged={this.handlePageChange}
              itemCount={count}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return this.renderTable();
  }
}

export default Movies;
