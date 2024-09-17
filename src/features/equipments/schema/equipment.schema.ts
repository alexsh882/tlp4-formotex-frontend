import { z } from "zod";

export const equipmentSchema = z.object({
  equipment_id: z.string().uuid().optional(),
  model: z.string().min(3).max(255),
  characteristics: z.string().min(3),
  equipment_type_id: z.string().uuid(),
  make_id: z.string().uuid(),
});
