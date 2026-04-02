import apiClient from "../api/apiClient.js";
export const getPatientsPaginated = async (page, size, search) => {
  const response = await apiClient.get(
    `/api/patients/paginated?page=${page}&size=${size}&search=${search}`,
  );
  return response.data;
};
export const createPatient = async (patientData) => {
  const response = await apiClient.post("/api/patients", patientData);
  return response.data;
};
export const updatePatient = async (id, patientData) => {
  const response = await apiClient.patch(`/api/patients/${id}`, patientData);
  return response.data;
};
export const deletePatient = async (id) => {
  const response = await apiClient.delete(`/api/patients/${id}`);
  return response.data;
};
