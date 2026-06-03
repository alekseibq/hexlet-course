import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  role: z.enum(["admin", "editor", "viewer"], { message: "Role is required" }),
});

export type UserFormData = z.infer<typeof userSchema>;
