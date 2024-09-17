import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { TUserCreate, TUserUpdate } from "../interfaces/user";
import UserForm from "./user-form";
import { useState } from "react";

type UserModalProps = {
  user?: TUserCreate | TUserUpdate;
  button: React.ReactNode;
};

export default function UserModal(props: UserModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <>
      <Dialog onOpenChange={handleOpenChange} open={isOpen}>
        <DialogTrigger asChild>{props.button}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {props.user?.user_id ? "Editar Usuario" : "Agregar nuevo usuario"}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <UserForm user={props.user} handleOpenChange={handleOpenChange} />
        </DialogContent>
      </Dialog>
    </>
  );
}
