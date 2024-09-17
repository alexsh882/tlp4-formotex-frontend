import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/shadcn/ui/dialog";

type MakeModalProps = {
  button: ReactNode;
  title: ReactNode;
  renderItem: (
    handleOpenChange: (open: boolean) => void,
    setErrorMessage: (message: string | null) => void
  ) => ReactNode;
};

export default function CreateEditModal({
  button,
  title,
  renderItem,
}: MakeModalProps) {
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
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {renderItem(handleOpenChange, setErrorMessage)}
          <DialogDescription className="text-destructive">
            {errorMessage}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
