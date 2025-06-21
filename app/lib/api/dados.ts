import { TabRouter } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import router from "../../../../excel-json-api/src/routes/upload";

// Use http://localhost:3000 para desenvolvimento local
const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;// || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});



export const getDados = async () => {
  
  const response = await api.get("/api/data");
  if (response.status !== 200) {
    throw new Error("Erro ao buscar dados");
  }
  return response.data;
  
};