import axios from "axios";
import { CONFIG } from "./configuration";

const httpClient = axios.create({
  baseURL: CONFIG.BACK_END,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
