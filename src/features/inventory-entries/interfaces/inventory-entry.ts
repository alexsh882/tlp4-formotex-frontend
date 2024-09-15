import { TUser } from "@/features/auth/interfaces/user";
import { TEquipment } from "@/features/equipments/interfaces/equipment";
import { TInventory } from "@/features/inventories/interfaces/inventory";

export type TInventoryEntries = {
    inventory_entry_id: number;
    serial: string;
    status: EquipmentStatus;
    date_in: string;
    date_out: string;
    observations: string;
    equipment_id: string;
    inventory_id: string;
    user_id: string;
    inventory: TInventory;
    equipment: TEquipment;
    user: TUser
  };

  export enum EquipmentStatus {
    REPAIRED = "repaired",
    UNDER_REPAIR = "under_repair",
    MAINTENANCE = "maintenance",
    DISPOSED = "disposed",
  }
  
  export type PartialInventoryEntriesDto = Partial<TInventoryEntries>;