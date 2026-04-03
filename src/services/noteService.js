import apiClient from "../api/apiClient";

export const getAllNotes = async () => {
  const response = await apiClient.get("/api/notes");
  return response.data;
};

export const createNote = async (noteData) => {
  const response = await apiClient.post("/api/notes", noteData);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await apiClient.patch(`/api/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await apiClient.delete(`/api/notes/${id}`);
  return response.data;
};
