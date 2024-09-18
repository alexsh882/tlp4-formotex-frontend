import InventoryEntryForm from "@/features/inventory-entries/components/inventory-entry-form";
import { getInventoryEntry } from "@/features/inventory-entries/services/inventory-entries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function InventoryEntryEdit() {
  const { inventory_entry_id } = useParams();

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
        <h1 className="text-4xl font-sans-accent mb-6">Editar Ingreso</h1>
      </hgroup>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <InventoryEntryForm inventoryEntry={inventoryEntry} />
      )}
    </>
  );
}
