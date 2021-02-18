import jwtDecode from "jwt-decode";
import config from "../config.json";
import http from "./httpService";

const authToken = "token";

const authApiEndpoint = config.apiEndpoint + "/auth/";

http.setJwtToken(getCurrentUserToken());

export async function loginUser(user) {
  const body = {
    email: user.username,
    password: user.password,
  };
  const { data: jwt } = await http.post(authApiEndpoint, body);
  localStorage.setItem(authToken, jwt);

  console.log("loginUser: ", body.email);
}

export function loginUserJwt(jwt) {
  localStorage.setItem(authToken, jwt);
}

export function logoutUser() {
  localStorage.removeItem(authToken);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(authToken);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getCurrentUserToken() {
  return localStorage.getItem(authToken);
}

export default {
  loginUser,
  loginUserJwt,
  logoutUser,
  getCurrentUser,
  getCurrentUserToken,
};
