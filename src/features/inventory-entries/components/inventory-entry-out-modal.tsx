import CreateEditModal from "@/features/ui/create-edit-modal";
import { TInventoryEntry } from "../interfaces/inventory-entry";
import { Button } from "@/components/shadcn/ui/button";
import InventoryEntryOutForm from "./inventory-entry-out-form";

type InventoryEntryOutModalProps = {
  inventoryEntry: TInventoryEntry;
};

export default function InventoryEntryOutModal({
  inventoryEntry,
}: InventoryEntryOutModalProps) {
  return (
    <CreateEditModal
      button={
        <Button variant="ghost" onClick={() => {}}>
          {inventoryEntry.date_out ? "Cambiar fecha de salida" : "Dar salida"}
        </Button>
      }
      title="Se dará salida del inventario al actual equipo informático"
      renderItem={(handleOpenChange, setErrorMessage) => {
        return (
          <InventoryEntryOutForm
            handleOpenChange={handleOpenChange}
            setErrorMessage={setErrorMessage}
            inventoryEntry={inventoryEntry}
          />
        );
      }}
    />
  );
}
