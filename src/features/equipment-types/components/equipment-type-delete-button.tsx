
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import { deleteEquipmentType } from "../services/equipment-types";
import ConfirmationModal from "@/features/ui/confirmation-modal";
import { useToast } from "@/hooks/use-toast";

type EquipmentTypeDeleteButtonProps = {
  equipment_type_id: string;
};

export default function EquipmentTypeDeleteButton({
  equipment_type_id,
}: EquipmentTypeDeleteButtonProps) {

    const { toast } = useToast();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteEquipmentType,
    mutationKey: ["equipment-types", "delete", equipment_type_id],
  });
  const client = useQueryClient();

  const handleDeleteUser = async (equipment_type_id: string) => {
    try {
      await mutateAsync(equipment_type_id as string);
      await client.invalidateQueries({
        queryKey: ["equipment-types"],
        type: "all",
      });
        toast({
            title: "Tipo eliminado",
            description: "El tipo ha sido eliminado exitosamente.",
            variant: "destructive"
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return setErrorMessage("El tipo no existe.");
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
      key={equipment_type_id}
      onConfirm={() => handleDeleteUser(equipment_type_id)}
      onCancel={() => setErrorMessage(null)}
    />
  );
}
