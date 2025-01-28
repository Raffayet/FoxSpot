import axios from "axios";
import Constants from "expo-constants/src/Constants";

export const SERVER_PORT = 8080;
export const LOCAL_IP =
  Constants.manifest2.extra.expoGo.debuggerHost.split(":")[0];
// export const API_URL = `http://${LOCAL_IP}:${SERVER_PORT}`
export const API_URL = `https://foxspot.onrender.com`;

const api = axios.create({
  baseURL: API_URL,
});

export default api;
