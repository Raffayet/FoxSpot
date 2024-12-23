import axios from "axios";
import Constants from "expo-constants/src/Constants";

export const SERVER_PORT = 8080
const localIP = Constants.manifest2.extra.expoGo.debuggerHost.split(':')[0]
const API_URL = `http://${localIP}:${SERVER_PORT}`

const api = axios.create({
    baseURL: API_URL
});

export default api;
