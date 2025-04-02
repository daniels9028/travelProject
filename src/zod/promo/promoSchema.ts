import { z } from "zod";

export const promoSchema = z.object({
  title: z
    .string()
    .min(6, "Title must be at least 6 character")
    .nonempty("Name cannot be empty"),
  description: z
    .string()
    .min(6, "Description must be at least 6 character")
    .nonempty("Description cannot be empty"),
  terms_condition: z
    .string()
    .min(6, "Terms condition must be at least 6 character")
    .nonempty("Terms condition cannot be empty"),
  promo_code: z
    .string()
    .min(5, "Promo code must be at least 5 character")
    .nonempty("Promo code cannot be empty"),
  promo_discount_price: z.coerce
    .number()
    .refine((val) => val !== null && val !== undefined && val !== 0, {
      message: "Promo discount price cannot be 0",
    }),
  minimum_claim_price: z.coerce
    .number()
    .refine((val) => val !== null && val !== undefined && val !== 0, {
      message: "Minimum claim price cannot be 0",
    }),
  imageUrl: z.string().min(1, "Image cannot be null"),
});
