import apiClient from "../api/apiClient";

export const getAllVisits = async () => {
  const response = await apiClient.get("/api/visits");
  return response.data;
};

export const createVisit = async (visitData) => {
  const response = await apiClient.post("/api/visits", visitData);
  return response.data;
};

export const updateVisit = async (id, visitData) => {
  const response = await apiClient.patch(`/api/visits/${id}`, visitData);
  return response.data;
};

export const deleteVisit = async (id) => {
  const response = await apiClient.delete(`/api/visits/${id}`);
  return response.data;
};
