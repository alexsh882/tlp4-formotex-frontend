import { z } from "zod";

export const inventorySchema = z.object({
  inventory_id: z.string().uuid().optional(),
  name: z.string().min(3).max(255),
});

