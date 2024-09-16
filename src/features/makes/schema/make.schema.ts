import { z } from "zod";

export const makeSchema = z.object({
  make_id: z.string().optional(),
  name: z.string().min(3).max(255),
});
