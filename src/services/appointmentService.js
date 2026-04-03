import apiClient from "../api/apiClient";

export const getAllAppointments = async () => {
  const response = await apiClient.get("/api/appointments");
  return response.data.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await apiClient.post("/api/appointments", appointmentData);
  return response.data.data;
};

export const updateAppointment = async (id, appointmentData) => {
  const response = await apiClient.patch(
    `/api/appointments/${id}`,
    appointmentData,
  );
  return response.data.data;
};

export const deleteAppointment = async (id) => {
  const response = await apiClient.delete(`/api/appointments/${id}`);
  return response.data;
};

export const getAppointmentsPaginated = async (page, size, search = "") => {
  const response = await apiClient.get(
    `/api/appointments/paginated?page=${page}&size=${size}&search=${search}`,
  );
  return response.data.data;
};
