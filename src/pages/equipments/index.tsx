
import EquipmentList from "@/features/equipments/components/equipments-list";
import { getEquipments } from "@/features/equipments/services/equipments";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function EquipmentsPage() {
  const [params, setParams] = useSearchParams();

  // const mergeParams = (obj: Record<string, string>) => {
  //   const newParams = new URLSearchParams(params);
  //   for (const [key, value] of Object.entries(obj)) {
  //     newParams.set(key, value);
  //   }
  //   setParams(newParams);
  // };

  const { data: equipments, isLoading } = useQuery({
    queryKey: ["equipments", params.toString()],
    queryFn: () => getEquipments(params),
  });
  

  return (
    <>
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Tipos de Equipos</h1>
      </hgroup>
      {isLoading && <p>Cargando...</p>}
      
      {!isLoading && equipments && (
        <EquipmentList equipments={equipments} />
      )}
    </>
  );
}
