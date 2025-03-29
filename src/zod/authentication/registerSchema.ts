import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(6, "Name must be at least 6 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordRepeat: z
      .string()
      .min(6, "Confirmation password must be at least 6 characters"),
    phoneNumber: z
      .string()
      .min(9, "Phone number must be at least 9 characters"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"], // Error message will be linked to passwordRepeat field
  });
