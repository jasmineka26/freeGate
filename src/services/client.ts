import _axios from "axios";

// let token = "";

let axios = createAxiosInstance(undefined);

const login = async (username: string, password: string) => {
  const res = await axios.post("/Login", { username, password });
  axios = createAxiosInstance(res.data);
  return res.data;
};

const getUsers = async () => {
  const res = await axios.get("/users");
  return res.data;
};

const client = Object.freeze({
  login,
  getUsers,
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
