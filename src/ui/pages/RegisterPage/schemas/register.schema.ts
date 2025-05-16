import * as zod from "zod";

export const registerSchema = zod
  .object({
    email: zod.string().email({
      message: "Email is invalid",
    }),
    username: zod.string().min(1, "Username is required"),
    password: zod.string().min(1, "Password is required"),
    confirmPassword: zod.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
