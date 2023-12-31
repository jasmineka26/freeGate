import _axios from "axios";
import Card from "../models/Card";
import Category from "../models/Category";
import Config from "../models/Config";
import ReportPayment from "../models/ReportPayment";
import User from "../models/User";
import Packes from "../models/packes";
import Payment from "../models/payments";
import Server from "../models/server";

// let token = "";

const AUTH_KEY = "auth";

let axios = createAxiosInstance(localStorage.getItem(AUTH_KEY) ?? undefined);

const login = async (username: string, password: string) => {
  const res = await axios.post("/Login", { username, password });
  const token = res.data;
  localStorage.setItem(AUTH_KEY, token);
  // const decoded = jwtDecode(token);
  // console.log(decoded);
  axios = createAxiosInstance(token);
  return res.data;
};

const getUsers = async (): Promise<User[]> => {
  const res = await axios.get("/users");
  return res.data;
};

const getCards = async (): Promise<Card[]> => {
  const res = await axios.get("/cards");
  return res.data;
};

const getConfigs = async (): Promise<Config[]> => {
  const res = await axios.get("/configs");
  return res.data;
};
const getPackes = async (): Promise<Packes[]> => {
  const res = await axios.get("/packages");
  return res.data;
};
const getServers = async (): Promise<Server[]> => {
  const res = await axios.get("/servers");
  return res.data;
};
const getPayments = async (): Promise<Payment[]> => {
  const res = await axios.get("/payments");
  return res.data;
};
const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get("/categories");
  return res.data;
};
const addCategory = async (title: string): Promise<Category> => {
  const res = await axios.post(`/categories/${title}`);
  return res.data;
};
const addCard = async (
  title: string,
  card_number: string,
  card_owner_name: string,
  owner_id: number
): Promise<Card> => {
  const res = await axios.post("/cards", {
    title,
    card_number,
    card_owner_name,
    owner_id,
  });
  return res.data;
};
const getReportPayments = async (
  startDate: Date,
  endDate: Date
): Promise<ReportPayment> => {
  const res = await axios.post("/reports/payment", { startDate, endDate });
  return res.data;
};

const client = Object.freeze({
  login,
  getUsers,
  getCards,
  getConfigs,
  getPackes,
  getServers,
  getPayments,
  getReportPayments,
  getCategories,
  addCategory,
  addCard,
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
