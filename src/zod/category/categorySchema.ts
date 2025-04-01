import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(6, "Name must be at least 6 character")
    .nonempty("Name cannot be empty"),
  imageUrl: z.string().min(1, "Image is required"),
});
