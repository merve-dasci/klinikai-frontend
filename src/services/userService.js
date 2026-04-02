import apiClient from "../api/apiClient";

export const getAllUsers = async () => {
  const response = await apiClient.get("/api/users");
  return response.data;
};
