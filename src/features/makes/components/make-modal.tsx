import { ReactNode, useState } from "react";
import { TMake } from "../interfaces/make";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/shadcn/ui/dialog";
import MakeForm from "./make-form";
import { Button } from "@/components/shadcn/ui/button";

type MakeModalProps = {
  make?: TMake;
  button: ReactNode;
};

export default function MakeModal({ make, button }: MakeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleSubmit = () => {
    console.log("Submit");

    handleOpenChange(false);
  };

  return (
    <>
      <Dialog onOpenChange={handleOpenChange} open={isOpen}>
        <DialogTrigger asChild>{button}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {make?.make_id ? "Editar marca" : "Agregar nueva marca"}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <MakeForm make={make} submit={handleSubmit} />
          <DialogFooter>
            <Button variant="secondary" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="default" onClick={handleSubmit}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
