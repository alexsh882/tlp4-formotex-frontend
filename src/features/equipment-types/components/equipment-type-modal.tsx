
import { TEquipmentType } from "../interfaces/equipment-type";
import CreateEditModal from "@/features/ui/create-edit-modal";
import EquipmentTypeForm from "./equipment-type-form";
import { ReactNode } from "react";

type EquipmentTypeModalProps = {
  equipmentType?: TEquipmentType;
    button: ReactNode;
};

export default function EquipmentTypeModal({
  equipmentType,
  button
}: EquipmentTypeModalProps) {
  return (
    <>
      <CreateEditModal
        button={button}
        title={
          equipmentType?.equipment_type_id
            ? "Editar tipo de equipo"
            : "Agregar nuevo tipo de equipo"
        }
        renderItem={(handleOpenChange, setErrorMessage) => {
          return (
            <EquipmentTypeForm
              handleOpenChange={handleOpenChange}
              setErrorMessage={setErrorMessage}
              equipmentType={equipmentType}
            />
          );
        }}
      />
    </>
  );
}
