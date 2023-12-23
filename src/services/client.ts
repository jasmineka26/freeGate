import _axios from "axios";

// let token = "";

const axios = _axios.create({
  baseURL: "http://localhost:3002/api",
  headers: {
    // Authorization:  `Bearer ${token}`,
  },
});

const login = async (username: string, password: string) => {
  const res = await axios.post("/Login", { username, password });
  return res.data;
};

const client = Object.freeze({
  login,
});

export default client;
