import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  productCount: z.number().optional(),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
