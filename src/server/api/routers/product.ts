import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getProducts: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return products;
  }),

  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Product name is required"),
        price: z.coerce.number().min(1000, "Price must be at least 1000"),
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const newProduct = await db.product.create({
        data: {
          name: input.name,
          price: input.price,
          category: {
            connect: {
              id: input.categoryId,
            },
          },
        },
      });
      return newProduct;
    }),
});
