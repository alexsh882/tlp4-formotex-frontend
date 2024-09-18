import { getInventoryEntry } from "@/features/inventory-entries/services/inventory-entries";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/shadcn/ui/button";
import CardInventoryEntry from "@/features/inventory-entries/components/card-inventory-entry";
import CardEquipment from "@/features/equipments/components/card-equipment";

export default function InventoryEntryShow() {
  const { inventory_entry_id } = useParams();

  const navigate = useNavigate();

  const {
    data: inventoryEntry,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["inventory-entry", inventory_entry_id],
    queryFn: ({ queryKey }) => getInventoryEntry(queryKey[1]),
  });

  return (
    <>
      <hgroup className="flex justify-between">
        <h1 className="text-4xl font-sans-accent mb-6 print:text-primary">
          Ingreso
        </h1>
        {!isLoading && inventoryEntry && (
          <Button
            variant="secondary"
            onClick={() =>
              navigate({
                pathname: `/inventory-entries/${inventoryEntry.inventory_entry_id}/edit`,
              })
            }
          >
            Editar
          </Button>
        )}
      </hgroup>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : inventoryEntry ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 print:text-black">
          <CardInventoryEntry inventoryEntry={inventoryEntry} />
          <CardEquipment
            equipment={inventoryEntry.equipment}
            serial={inventoryEntry.serial}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
