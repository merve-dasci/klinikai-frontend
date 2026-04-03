import apiClient from "../api/apiClient";

export const getAllUsers = async (page = 0, size = 100) => {
  const response = await apiClient.get(`/api/users?page=${page}&size=${size}`);
  return response.data.data.content;
};
