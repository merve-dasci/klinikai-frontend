import apiClient from "../api/apiClient.js";

export const loginUser = async (loginData) => {
  const response = await apiClient.post("/auth/login", loginData);
  return response.data;
};
export const refreshToken = async () => {
  const response = await apiClient.post("/auth/refresh");
  return response.data;
};
