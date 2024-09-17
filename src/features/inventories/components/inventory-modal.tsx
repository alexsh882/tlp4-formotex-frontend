import { ReactNode } from "react";

import CreateEditModal from "@/features/ui/create-edit-modal";

import { TInventory } from "../interfaces/inventory";
import InventoryForm from "./inventory-form";

type InventoryModalProps = {
  inventory?: TInventory;
  button: ReactNode;
};

export default function InventoryModal({
  inventory,
  button,
}: InventoryModalProps) {
  return (
    <>
      <CreateEditModal
        button={button}
        title={
          inventory?.inventory_id
            ? "Editar inventario"
            : "Agregar nuevo inventario"
        }
        renderItem={(handleOpenChange, setErrorMessage) => {
          return (
            <InventoryForm
              handleOpenChange={handleOpenChange}
              setErrorMessage={setErrorMessage}
              inventory={inventory}
            />
          );
        }}
      />
    </>
  );
}
