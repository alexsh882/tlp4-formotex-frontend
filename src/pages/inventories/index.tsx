import { Button } from "@/components/shadcn/ui/button";
import InventoriesList from "@/features/inventories/components/inventories-list";
import InventoryModal from "@/features/inventories/components/inventory-modal";
import { getInventories } from "@/features/inventories/services/inventories";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function InventoriesPage() {
  const [params, setParams] = useSearchParams();

  // const mergeParams = (obj: Record<string, string>) => {
  //   const newParams = new URLSearchParams(params);
  //   for (const [key, value] of Object.entries(obj)) {
  //     newParams.set(key, value);
  //   }
  //   setParams(newParams);
  // };

  const { data: inventories, isLoading } = useQuery({
    queryKey: ["inventories", params.toString()],
    queryFn: () => getInventories(params),
  });

  return (
    <>
      <hgroup className="flex justify-between">
        <h1 className="text-4xl font-sans-accent mb-6">Depósitos</h1>
        <InventoryModal button={<Button variant={"default"}>Agregar nuevo </Button>} />
      </hgroup>
      {isLoading && <p>Cargando...</p>}

      {!isLoading && inventories && (
        <InventoriesList inventories={inventories} />
      )}
    </>
  );
}
