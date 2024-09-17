import { TEquipment } from "@/features/equipments/interfaces/equipment";
import { TInventory } from "@/features/inventories/interfaces/inventory";
import { TUser } from "@/features/users/interfaces/user";

export type TInventoryEntry = {
  inventory_entry_id: string;
  serial: string;
  status: EquipmentStatus;
  date_in: Date;
  date_out: Date | null;
  observations: string;
  equipment_id: string;
  inventory_id: string;
  user_id: string;
  inventory: TInventory;
  equipment: TEquipment;
  user: TUser;
};

export enum EquipmentStatus {
  REPAIRED = "repaired",
  UNDER_REPAIR = "under_repair",
  MAINTENANCE = "maintenance",
  DISPOSED = "disposed",
}

export const EquipmentStatusLabels = [
  {
    label: "Reparado",
    value: EquipmentStatus.REPAIRED,
  },
  {
    label: "En reparación",
    value: EquipmentStatus.UNDER_REPAIR,
  },
  {
    label: "En mantenimiento",
    value: EquipmentStatus.MAINTENANCE,
  },
  {
    label: "Desechado",
    value: EquipmentStatus.DISPOSED,
  },
];

export type TInventoryEntryCreate = Omit<
  TInventoryEntry,
  "inventory_entry_id" | "inventory" | "equipment" | "user" | "user_id"
>;

export type TInventoryEntryUpdate = Omit<
  Partial<TInventoryEntry>,
  "inventory" | "equipment" | "user" | "user_id"
>;
