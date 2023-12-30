import _axios from "axios";
import User from "../models/User";

// let token = "";

const AUTH_KEY = "auth";

let axios = createAxiosInstance(localStorage.getItem(AUTH_KEY) ?? undefined);

const login = async (username: string, password: string) => {
  const res = await axios.post("/Login", { username, password });
  const token = res.data;
  localStorage.setItem(AUTH_KEY, token);
  axios = createAxiosInstance(token);
  return res.data;
};

const getUsers = async (): Promise<User[]> => {
  const res = await axios.get("/users");
  return res.data;
};

const getCards = async () => {
  const res = await axios.get("/cards");
  return res.data;
};

const getConfigs = async () => {
  const res = await axios.get("/configs");
  return res.data;
};

const client = Object.freeze({
  login,
  getUsers,
  getCards,
  getConfigs,
});
export default client;

function createAxiosInstance(token: string | undefined) {
  return _axios.create({
    baseURL: "http://localhost:3002/api",
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
