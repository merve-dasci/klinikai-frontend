import { z } from "zod";

export const visitSchema = z.object({
  visitDate: z.string().min(1, "Visit date is required"),

  patientId: z.string().min(1, "Patient is required"),

  doctorId: z.string().min(1, "Doctor is required"),

  appointmentId: z.string().min(1, "Appointment is required"),
});
