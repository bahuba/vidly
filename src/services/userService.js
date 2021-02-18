import config from "../config.json";
import http from "./httpService";

const userApiEndpoint = config.apiEndpoint + "/users/";

export function getUsers() {
  return http.get(userApiEndpoint);
}

export function getUser(id) {
  return http.get(userApiEndpoint + id);
}

export function registerUser(user) {
  const body = {
    name: user.username,
    email: user.email,
    password: user.password,
  };

  console.log("registerUser: ", body);
  return http.post(userApiEndpoint, body);
}

export function deleteUser(id) {
  return http.delete(userApiEndpoint + id);
}
