import { TEquipmentType } from "@/features/equipment-types/interfaces/equipment-type";
import { TMake } from "@/features/makes/interfaces/make";

export type TEquipment = {
  equipment_id: string;
  model: string;
  characteristics: string;
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
  };
  created_at: string;
  updated_at: string;
};

export type TEquipmentCreate = Omit<
  TEquipment,
  | "equipment_id"
  | "created_at"
  | "updated_at"
  | "user"
  | "make"
  | "equipment_type"
>;

export type TEquipmentUpdate = Partial<TEquipment>;
