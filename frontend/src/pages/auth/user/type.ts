import z from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email must be at most 100 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
  id_rol: z.number().min(1),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});


export type UserType = z.infer<typeof userSchema>;