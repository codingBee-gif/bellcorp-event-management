import axios from "axios";

const api = axios.create({
  baseURL: "https://bellcorp-event-management-xqen.onrender.com/api",
});

export default api;
