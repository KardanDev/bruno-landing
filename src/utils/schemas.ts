import z from "zod";

export const contactSchema = z.object({
  email: z.email(),
  name: z.string(),
  message: z.string(),
  subject: z.string(),
  phone: z.string(),
});

export type TContactSchema = z.infer<typeof contactSchema>;
