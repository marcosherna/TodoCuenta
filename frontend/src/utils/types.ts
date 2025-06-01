import z from "zod";

export const PaginateSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  limit: z.number(),
});

export type PaginateType = z.infer<typeof PaginateSchema>;
