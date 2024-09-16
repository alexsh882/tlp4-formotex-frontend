import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/user";
import { useState } from "react";
import { AxiosError } from "axios";

type UserDeleteButtonProps = {
  user_id: string;
};

export default function UserDeleteButton({ user_id }: UserDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteUser,
    mutationKey: ["users", "delete", user_id],
  });
  const client = useQueryClient();

  const handleDeleteUser = async (user_id: string) => {
    try {
      await mutateAsync(user_id as string);
      await client.invalidateQueries({
        queryKey: ["users"],
        type: "all",
      });
      handleOpenConfirmationModal(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return setErrorMessage("El usuario no existe.");
        }
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  const handleOpenConfirmationModal = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOpenConfirmationModal} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Estás absolutamente seguro?</DialogTitle>
          <DialogDescription>
            Esta acción no puede deshacerse. Prosigue bajo tu propio riesgo.
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="text-destructive">
          {errorMessage}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={() => handleDeleteUser(user_id)}
            variant="destructive"
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
