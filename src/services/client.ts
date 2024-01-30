import _axios from "axios";
import Card from "../models/Card";
import Category from "../models/Category";
import Config from "../models/Config";
import ReportPayment from "../models/ReportPayment";
import User from "../models/User";
import Packes from "../models/packes";
import Payment from "../models/payments";
import Server from "../models/Server";
import Sub from "../models/Sub";
import Inbound from "../models/Inbound";

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
//Get================================================
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
const getAdminUsers = async (): Promise<User[]> => {
  const res = await axios.get("/users/admins");
  return res.data;
};
const getInboundsByServerId = async (serverId: number): Promise<Inbound[]> => {
  const res = await axios.get(`/inbounds/server/${serverId}`);
  return res.data;
};
const getAllSubscriptions = async (): Promise<Sub[]> => {
  const res = await axios.get(`/subscriptions/all`);
  return res.data;
};

//Post====================================================
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
const addManualPeyment = async (
  id: number,
  admin_desc: unknown,
  paid: unknown,
  payment_card_id: unknown,
  package_id: unknown
): Promise<Payment> => {
  const res = await axios.post(`/payments/submit_payment/${id}`, {
    admin_desc,
    paid,
    payment_card_id,
    package_id,
  });
  return res.data;
};

const addPackage = async (
  title: string,
  duration: number,
  traffic: number,
  price: number,
  server_category_id: number
): Promise<Packes> => {
  const res = await axios.post("/packages", {
    title,
    duration,
    traffic,
    price,
    server_category_id,
  });
  return res.data;
};

const addConfig = async (
  title: string,
  user_title: string,
  address: string,
  sni: string,
  settings: Record<string, string>
): Promise<Config> => {
  const res = await axios.post("/configs", {
    address,
    sni,
    title,
    user_title,
    settings,
  });
  return res.data;
};
const addServer = async (
  title: string,
  address: string,
  xui_port: number,
  xui_user: string,
  xui_pass: string,
  server_category_id: number
): Promise<Server> => {
  const res = await axios.post("/servers", {
    title,
    address,
    xui_port,
    xui_user,
    xui_pass,
    server_category_id,
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
const addSubscription = async (
  total_traffic_GB: number,
  expired_at: string | null,
  id: number
): Promise<ReportPayment> => {
  const res = await axios.post(`/subscriptions/${id}`, {
    total_traffic_GB,
    expired_at,
  });
  return res.data;
};
const addXray = async (
  userId: number
): Promise<{
  id: number;
  username: string;
  success: boolean;
  message: string;
}> => {
  const res = await axios.post(`/xray/accounts/add/${userId}`);
  return res.data;
};
const addUser = async (request: {
  name: string;
  username: string;
  password: string;
  os: "android" | "ios";
  role_id: number;
  xrayAccounts: unknown[];
  payment_card_id: number;
  server_id: number;
  referer_id: number | null;
  current_subscription_id: null;
}): Promise<User> => {
  const res = await axios.post("/users", request);

  return res.data;
};
//Delete=================================================
const deleteServer = async (server_category_id: number): Promise<Server> => {
  const res = await axios.delete(`/servers/${server_category_id}`);
  return res.data;
};
// Update================================================
const UpdatePack = async (
  duration: number,
  price: number,
  server_category_id: number,
  title: string,
  traffic: number,
  id: number
): Promise<Packes> => {
  const res = await axios.put(`/packages/${id}`, {
    duration,
    price,
    server_category_id,
    title,
    traffic,
  });
  return res.data;
};
const UpdateCard = async (
  title: string,
  card_number: string,
  card_owner_name: string,
  id: number
): Promise<Card> => {
  const res = await axios.put(`/cards/${id}`, {
    title,
    card_number,
    card_owner_name,
  });
  return res.data;
};

const UpdateCatecory = async (title: string, id: number): Promise<Category> => {
  const res = await axios.put(`/categories/${id}/${title}`);
  return res.data;
};
const UpdateConfig = async (
  title: string,
  address: string,
  settings: Record<string, string>,
  sni: string,
  user_title: string,
  id: number
): Promise<Config> => {
  const res = await axios.put(`/configs/${id}`, {
    title,
    address,
    settings,
    sni,
    user_title,
  });
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
  getInboundsByServerId,
  getAllSubscriptions,
  addCategory,
  addCard,
  getAdminUsers,
  addPackage,
  addConfig,
  addServer,
  addUser,
  deleteServer,
  addManualPeyment,
  addSubscription,
  UpdatePack,
  UpdateCard,
  UpdateCatecory,
  UpdateConfig,
  addXray,
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
