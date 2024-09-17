
import CreateEditModal from "@/features/ui/create-edit-modal";
import { ReactNode } from "react";
import { TEquipment } from "../interfaces/equipment";
import EquipmentForm from "./equipment-form";

type EquipmentModalProps = {
  equipment?: TEquipment;
    button: ReactNode;
};

export default function EquipmentModal({
  equipment,
  button
}: EquipmentModalProps) {
  return (
    <>
      <CreateEditModal
        button={button}
        title={
          equipment?.equipment_type_id
            ? "Editar tipo de equipo"
            : "Agregar nuevo tipo de equipo"
        }
        renderItem={(handleOpenChange, setErrorMessage) => {
          return (
            <EquipmentForm
              handleOpenChange={handleOpenChange}
              setErrorMessage={setErrorMessage}
              equipment={equipment}
            />
          );
        }}
      />
    </>
  );
}
