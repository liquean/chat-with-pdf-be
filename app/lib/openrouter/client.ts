import axios from "axios";

const APIClient = axios.create({
  baseURL: process.env.OPEN_ROUTE_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.OPEN_ROUTE_TOKEN}`,
    "Content-Type": "application/json",
  },
});
export default APIClient;
