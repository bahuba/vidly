// @ts-check
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      _id: null,
      title: "",
      genreId: "",
      genreName: "",
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    errors: {},
    genreNames: [],
  };

  schema = {
    _id: Joi.any(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.any(),
    genreName: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  async componentDidMount() {
    // init genre names
    const { data: genres } = await getGenres();
    for (let i = 0; i < genres.length; i++) {
      this.state.genreNames[i] = genres[i].name;
    }

    console.log("Genres: ", genres);

    // load movie from DB
    if (this.props.match.params.id === "new") return;

    const { data: movie } = await getMovie(this.props.match.params.id);
    if (!movie) this.props.history.replace("/not-found");

    const data = { ...this.state.data };
    data._id = movie._id;
    data.title = movie.title;
    data.genreId = movie.genre._id;
    data.genreName = movie.genre.name;
    data.numberInStock = movie.numberInStock;
    data.dailyRentalRate = movie.dailyRentalRate;

    this.setState({ data });
    console.log("Loading movie: ", data);
  }

  doSubmit = async () => {
    // console.log(data);
    // set genre Id
    const { data: genres } = await getGenres();
    const genre = genres.find((g) => g.name === this.state.data.genreName);
    this.state.data.genreId = genre._id;
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h2>Movie Form {this.state.data.title}</h2>
        <form>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreName", "Genre", this.state.genreNames)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
