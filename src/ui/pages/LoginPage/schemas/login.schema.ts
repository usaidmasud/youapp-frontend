import * as zod from "zod";

export const loginSchema = zod.object({
  usernameOrEmail: zod.string().min(1),
  password: zod.string().min(1),
});
