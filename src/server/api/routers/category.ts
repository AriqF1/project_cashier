import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        productCount: true,
      },
    });
    return categories;
  }),

  createCategory: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Category name is required"),
        productCount: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const newCategory = await db.category.create({
        data: {
          name: input.name,
        },
      });
      return newCategory;
    }),

  deleteCategory: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid("Invalid category ID"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      await db.category.delete({
        where: { id: input.id },
      });
      return { success: true };
    }),
});
