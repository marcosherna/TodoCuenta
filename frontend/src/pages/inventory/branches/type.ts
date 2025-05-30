import z from "zod";

export interface Branch {
  id?: number;
  name: string;
  location: string;
}

export const BranchSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
});
