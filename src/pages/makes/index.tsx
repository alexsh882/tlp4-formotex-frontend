

import MakesList from "@/features/makes/components/makes-list";
import { getMakes } from "@/features/makes/services/makes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function MakesPage() {
  const [params, setParams] = useSearchParams();

  // const mergeParams = (obj: Record<string, string>) => {
  //   const newParams = new URLSearchParams(params);
  //   for (const [key, value] of Object.entries(obj)) {
  //     newParams.set(key, value);
  //   }
  //   setParams(newParams);
  // };

  const { data: makes, isLoading } = useQuery({
    queryKey: ["makes", params.toString()],
    queryFn: () => getMakes(params),
  });
  

  return (
    <>
      <hgroup>
        <h1 className="text-4xl font-sans-accent mb-6">Marcas de Equipos Informáticos</h1>
      </hgroup>
      {isLoading && <p>Cargando...</p>}
      
      {!isLoading && makes && (
        <MakesList makes={makes} />
      )}
    </>
  );
}
