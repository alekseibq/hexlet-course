import { z } from "zod";

export const User = z
  .object({
    id: z.number().int(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["admin", "editor", "viewer"]),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
export const UserFormData = z
  .object({
    name: z.string().min(1).max(100),
    email: z.string().min(1),
    role: z.enum(["admin", "editor", "viewer"]),
  })
  .passthrough();

