import { z } from "zod";

export const noteSchema = z.object({
  visitId: z.string().min(1, "Visit is required"),

  content: z.string().min(1, "Note content is required"),
});
