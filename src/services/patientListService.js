import apiClient from "../api/apiClient";

export const getAllPatientsList = async () => {
  const response = await apiClient.get("/api/patients");
  return response.data;
};
