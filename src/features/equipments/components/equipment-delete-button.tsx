
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import ConfirmationModal from "@/features/ui/confirmation-modal";
import { useToast } from "@/hooks/use-toast";
import { deleteEquipment } from "../services/equipments";

type EquipmentDeleteButtonProps = {
  equipment_id: string;
};

export default function EquipmentDeleteButton({
  equipment_id,
}: EquipmentDeleteButtonProps) {

    const { toast } = useToast();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteEquipment,
    mutationKey: ["equipments", "delete", equipment_id],
  });
  const client = useQueryClient();

  const handleDeleteUser = async (equipment_id: string) => {
    try {
      await mutateAsync(equipment_id as string);
      await client.invalidateQueries({
        queryKey: ["equipments"],
        type: "all",
      });
        toast({
            title: "Equipo eliminado",
            description: "El equipo ha sido eliminado exitosamente.",
            variant: "destructive"
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return setErrorMessage("El equipo no existe.");
        }
        setErrorMessage(error.response?.data.message);
      }
    }
  };


  return (
    <ConfirmationModal
      buttonLabel="Eliminar"
      title="Estás absolutamente seguro?"
      description={
        "Esta acción no puede deshacerse. Prosigue bajo tu propio riesgo."
      }
      onErrorMessage={errorMessage}
      disabledButton={isPending}
      key={equipment_id}
      onConfirm={() => handleDeleteUser(equipment_id)}
      onCancel={() => setErrorMessage(null)}
    />
  );
}
