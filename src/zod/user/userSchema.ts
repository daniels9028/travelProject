import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  email: z.string().email().nonempty("Email cannot be empty"),
  phoneNumber: z.string().nonempty("Phone number cannot be empty"),
});

export const defaultUserValues = {
  name: "",
  email: "",
  phoneNumber: "",
};
