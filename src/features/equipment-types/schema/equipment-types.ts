import { z } from "zod";

export const equipmentTypeSchema = z.object({
  equipment_type_id: z.string().optional(),
  name: z.string().min(3).max(255),
});
