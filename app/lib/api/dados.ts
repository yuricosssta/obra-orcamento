import { TabRouter } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";

// Use http://localhost:3000 para desenvolvimento local
const API_BASE_URL =
  // Constants.manifest?.extra?.API_BASE_URL ||
  Constants.expoConfig?.extra?.API_BASE_URL ||
  "https://excel-json-api.vercel.app";

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