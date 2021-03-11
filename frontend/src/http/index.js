import axios from "axios";

export const auth = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export async function register({ email, password }) {
  const res = await auth.post("/register", {
    email,
    password,
  });
  console.log(res);
}

export async function login({ username, password }) {
  const querystring = require("querystring");
  const res = await auth.post(
    "/token",
    querystring.stringify({ username, password })
  );
  const { access_token } = res.data;

  sessionStorage.setItem("accessToken", access_token);
}

export async function user() {
  const accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

  const res = await auth.get("/users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res);
  return res;
}
