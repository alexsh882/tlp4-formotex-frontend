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
  import { useState } from "react";
  import { AxiosError } from "axios";
import { deleteMake } from "../services/makes";
  
  type MakeDeleteButtonProps = {
    make_id: string;
  };
  
  export default function MakeDeleteButton({ make_id }: MakeDeleteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
  
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const { mutateAsync, isPending } = useMutation({
      mutationFn: deleteMake,
      mutationKey: ["makes", "delete", make_id],
    });
    const client = useQueryClient();
  
    const handleDeleteUser = async (make_id: string) => {
      try {
        await mutateAsync(make_id as string);
        await client.invalidateQueries({
          queryKey: ["makes"],
          type: "all",
        });
        handleOpenConfirmationModal(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            return setErrorMessage("La marca no existe.");
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
              onClick={() => handleDeleteUser(make_id)}
              variant="destructive"
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  