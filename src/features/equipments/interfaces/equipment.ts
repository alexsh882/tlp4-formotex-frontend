import { TEquipmentType } from "@/features/equipment-types/interfaces/equipment-type";
import { TMake } from "@/features/makes/interfaces/make";

export type TEquipment = {
  equipment_id: string;
  model: string;
  characteristics: string;
  created_at: string;
  updated_at: string;
  equipment_type_id: string;
  make_id: string;
  user_id: string;
  equipment_type: TEquipmentType;
  make: TMake;
  user: {
    user_id: string;
    names: string;
    created_at: string;
    updated_at: string;
  }
};
