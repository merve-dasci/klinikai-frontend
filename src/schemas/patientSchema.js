import { z } from "zod";

export const patientSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),

  lastName: z.string().min(2, "Last name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone number is too short"),

  tcNo: z.string().length(11, "TC No must be 11 characters"),

  birthDate: z.string().min(1, "Birth date is required"),
});
