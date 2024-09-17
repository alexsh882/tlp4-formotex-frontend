export type TEquipmentType = {
  equipment_type_id: string;
  name: string;
};


export type TEquipmentTypeCreate = Omit<TEquipmentType, "equipment_type_id">;

export type TEquipmentTypeUpdate = Partial<TEquipmentType>;
