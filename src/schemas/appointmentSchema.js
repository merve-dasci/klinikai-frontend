import { z } from "zod";

export const appointmentSchema = z.object({
  appointmentDate: z.string().min(1, "Date is required"),

  status: z.string().min(1, "Status is required"),

  notes: z.string().optional(),

  patientId: z.string().min(1, "Patient is required"),

  doctorId: z.string().min(1, "Doctor is required"),
});
