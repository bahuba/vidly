import config from "../config.json";
import http from "./httpService";

export function getMovies() {
  return http.get(config.apiEndpoint + "/movies");
}

export function getMovie(id) {
  return http.get(config.apiEndpoint + "/movies/" + id);
}

export function saveMovie(movie) {
  let payload = {
    title: "",
    genreId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  };

  payload.title = movie.title;
  payload.genreId = movie.genreId;
  payload.numberInStock = movie.numberInStock;
  payload.dailyRentalRate = movie.dailyRentalRate;

  console.log("saveMovie: ", movie._id, payload);
  let resp;
  if (movie._id === null)
    resp = http.post(config.apiEndpoint + "/movies", payload);
  else resp = http.put(config.apiEndpoint + "/movies/" + movie._id, payload);

  return resp;
}

export function deleteMovie(id) {
  return http.delete(config.apiEndpoint + "/movies/" + id);
}
