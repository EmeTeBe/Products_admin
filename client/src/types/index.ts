import { z } from "zod";

export const DraftProductSchema = z.object({
  name: z.string(),
  price: z.number().int().positive(),
});

export const ProductSchema = DraftProductSchema.extend({
  id: z.number().int().positive(),
  availability: z.boolean(),
});

export const ProductsSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
