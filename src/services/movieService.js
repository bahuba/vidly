import config from "../config.json";
import http from "./httpService";

async function getMovies() {
  const data = await http.get(config.apiEndpoint + "/movies");
  return data;
}

export default { getMovies };
