import { z } from "zod";

export const activitySchema = z.object({
  categoryId: z.string().nonempty("Category cannot be empty"),
  title: z.string().nonempty("Title cannot be empty"),
  description: z.string().nonempty("Description cannot be empty"),
  price: z.coerce
    .number()
    .refine((val) => val !== null && val !== undefined && val !== 0, {
      message: "Price cannot be 0",
    }),
  price_discount: z.coerce
    .number()
    .refine((val) => val !== null && val !== undefined && val !== 0, {
      message: "Price discount cannot be 0",
    }),
  rating: z.coerce
    .number()
    .refine((val) => val !== null && val !== undefined && val !== 0, {
      message: "Rating cannot be 0",
    })
    .refine((val) => val >= 1 && val <= 5, {
      message: "Rating only between 1-5",
    }),
  total_reviews: z.coerce
    .number()
    .refine((val) => val !== null && val !== undefined && val !== 0, {
      message: "Total reviews cannot be 0",
    }),
  facilities: z.string().nonempty("Facilities cannot be empty"),
  address: z.string().nonempty("Address cannot be empty"),
  province: z.string().nonempty("Province cannot be empty"),
  city: z.string().nonempty("City cannot be empty"),
  location_maps: z.string().nonempty("Location maps cannot be empty"),
});

export const activityDefaultValues = {
  categoryId: "",
  title: "",
  description: "",
  price: 0,
  price_discount: 0,
  rating: 1,
  total_reviews: 0,
  facilities: "",
  address: "",
  province: "",
  city: "",
  location_maps: "",
};
