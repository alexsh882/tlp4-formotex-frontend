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
import { useState } from "react";

type ConfirmationModalProps = {
  title: string;
  description: string | null;
  onErrorMessage: string | null;
  onCancel: () => void;
  buttonLabel: string;
  disabledButton?: boolean;
  onConfirm: () => void;
};

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenConfirmationModal = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      props.onCancel();
    }
  };

  return (
    <Dialog onOpenChange={handleOpenConfirmationModal} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">{props.buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <DialogDescription className="text-destructive">
          {props.onErrorMessage}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            disabled={props.disabledButton}
            onClick={() => {
              props.onConfirm();
              if (!props.onErrorMessage) {
                handleOpenConfirmationModal(true);
              }
            }}
            variant="destructive"
          >
            {props.buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
