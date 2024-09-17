
import { useState } from "react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConfirmationModal from "@/features/ui/confirmation-modal";
import { useToast } from "@/hooks/use-toast";
import { deleteInventory } from "../services/inventories";

type InventoryDeleteButtonProps = {
  inventory_id: string;
};

export default function InventoryDeleteButton({
  inventory_id,
}: InventoryDeleteButtonProps) {

    const { toast } = useToast();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteInventory,
    mutationKey: ["inventories", "delete", inventory_id],
  });
  const client = useQueryClient();

  const handleDeleteUser = async (inventory_id: string) => {
    try {
      await mutateAsync(inventory_id as string);
      await client.invalidateQueries({
        queryKey: ["inventories"],
        type: "all",
      });
        toast({
            title: "Inventario eliminado",
            description: "El inventario ha sido eliminado exitosamente.",
            variant: "destructive"
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return setErrorMessage("El inventario no existe.");
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
      key={inventory_id}
      onConfirm={() => handleDeleteUser(inventory_id)}
      onCancel={() => setErrorMessage(null)}
    />
  );
}
