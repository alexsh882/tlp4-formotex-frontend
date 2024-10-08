import { Button } from "@/components/shadcn/ui/button";
import EquipmentTypeModal from "@/features/equipment-types/components/equipment-type-modal";
import EquipmentTypesList from "@/features/equipment-types/components/equipment-types-list";
import { getEquipmentTypes } from "@/features/equipment-types/services/equipment-types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function EquipmentTypesPage() {
  const [params, setParams] = useSearchParams();

  // const mergeParams = (obj: Record<string, string>) => {
  //   const newParams = new URLSearchParams(params);
  //   for (const [key, value] of Object.entries(obj)) {
  //     newParams.set(key, value);
  //   }
  //   setParams(newParams);
  // };

  const { data: equipmentTypes, isLoading } = useQuery({
    queryKey: ["equipment-types", params.toString()],
    queryFn: () => getEquipmentTypes(params),
  });

  return (
    <>
      <hgroup className="flex justify-between">
        <h1 className="text-4xl font-sans-accent mb-6">Tipos de Equipos</h1>
        <EquipmentTypeModal
          button={<Button variant={"default"}>Agregar nuevo</Button>}
        />
      </hgroup>
      {isLoading && <p>Cargando...</p>}

      {!isLoading && equipmentTypes && (
        <EquipmentTypesList equipmentTypes={equipmentTypes} />
      )}
    </>
  );
}
