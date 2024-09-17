export type TInventory = {
  inventory_id: string;
  name: string;
};

export type TInventoryCreate = Omit<TInventory, "inventory_id">;

export type TInventoryUpdate = Partial<TInventory>;
