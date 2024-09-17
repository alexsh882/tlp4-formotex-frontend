import { z } from "zod";
import { EquipmentStatus } from "../interfaces/inventory-entry";

export const inventoryEntrySchema = z.object({
  inventory_entry_id: z.string().uuid().optional(),
  serial: z
    .string({
      message: "El serial es requerido",
    })
    .min(2, {
      message: "Al menos dos caracteres",
    })
    .max(255, {
      message: "No puede exceder los 255 caracteres",
    }),
  status: z.nativeEnum(EquipmentStatus, {
    message: "El estado es requerido",
  }),
  date_in: z.date({
    coerce: true,
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_date" ? "La fecha es requerida." : defaultError,
    }),
  }),
  date_out: z
    .date({
      message: "La fecha de salida debe ser una fecha válida",
    })
    .optional(),
  observations: z.string({
    message: "Las observaciones son requeridas",
  }).min(2, {
    message: "Al menos dos caracteres",
  }),
  equipment_id: z
    .string({
      message: "El equipo es requerido",
    })
    .uuid(),
  inventory_id: z
    .string({
      message: "El depósito es requerido",
    })
    .uuid(),
});
