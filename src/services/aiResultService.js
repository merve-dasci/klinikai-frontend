import apiClient from "../api/apiClient";

export const getAllAiResults = async () => {
  const response = await apiClient.get("/api/ai-results");
  return response.data;
};

export const createAiResult = async (aiResultData) => {
  const response = await apiClient.post("/api/ai-results", aiResultData);
  return response.data;
};

export const updateAiResult = async (id, aiResultData) => {
  const response = await apiClient.patch(`/api/ai-results/${id}`, aiResultData);
  return response.data;
};

export const deleteAiResult = async (id) => {
  const response = await apiClient.delete(`/api/ai-results/${id}`);
  return response.data;
};

export const getAiResultsByNoteId = async (noteId) => {
  const response = await apiClient.get(`/api/ai-results/note/${noteId}`);
  return response.data;
};
