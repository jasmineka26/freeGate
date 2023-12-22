import axios from "axios";

// let token = "";

export default axios.create({
  baseURL: "http://localhost:3002/api",
  headers: {
    // Authorization:  `Bearer ${token}`,
  },
});
