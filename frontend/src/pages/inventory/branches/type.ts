import z from "zod";

export const BranchSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  createdAt: z
    .string()
    .optional(),
  updatedAt: z
    .string()
    .optional(),
});

export type BrancheType = z.infer<typeof BranchSchema>;

export const ResponseApiSchema  = z.object({
  data: z.array(BranchSchema),
  pagination: z.object({
    totalItems: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    limit: z.number(),
  }),
});

export type TypeResponseApiSchema = z.infer<typeof ResponseApiSchema>;
