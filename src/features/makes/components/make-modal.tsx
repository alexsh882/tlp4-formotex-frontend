import { ReactNode, useState } from "react";
import { TMake } from "../interfaces/make";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/shadcn/ui/dialog";
import MakeForm from "./make-form";

type MakeModalProps = {
  make?: TMake;
  button: ReactNode;
};

export default function MakeModal({ make, button }: MakeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    
    setIsOpen(open);
    if (!open) {
      setErrorMessage(null);
    }
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
          <MakeForm
            make={make}
            handleOpenChange={handleOpenChange}
            setErrorMessage={setErrorMessage}
          />
          <DialogDescription className="text-destructive">
            {errorMessage}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
