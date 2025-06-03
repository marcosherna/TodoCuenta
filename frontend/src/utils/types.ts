import z from "zod";

export const PaginateSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  limit: z.number(),
});

export const RolSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  status: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type RolType = z.infer<typeof RolSchema>;
export type PaginateType = z.infer<typeof PaginateSchema>;
