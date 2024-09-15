
import InventoryEntriesList from "@/features/inventory-entries/components/inventory-entries-list";
import { getInventoryEntries } from "@/features/inventory-entries/services/inventory-entries";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function InventoryEntriesPage() {
  const [params, setParams] = useSearchParams();

  // const mergeParams = (obj: Record<string, string>) => {
  //   const newParams = new URLSearchParams(params);
  //   for (const [key, value] of Object.entries(obj)) {
  //     newParams.set(key, value);
  //   }
  //   setParams(newParams);
  // };

  const { data: inventoryEntries, isLoading } = useQuery({
    queryKey: ["inventory-entries", params.toString()],
    queryFn: () => getInventoryEntries(params),
  });
  

  return (
    <>
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Inventario</h1>
      </hgroup>
      {isLoading && <p>Cargando...</p>}
      
      {!isLoading && inventoryEntries && (
        <InventoryEntriesList inventoryEntries={inventoryEntries} />
      )}
    </>
  );
}
