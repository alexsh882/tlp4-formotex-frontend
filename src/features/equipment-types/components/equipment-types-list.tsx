import { TEquipmentType } from "../interfaces/equipment-type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";
import { Button } from "@/components/shadcn/ui/button";

type EquipmentTypesListProps = {
  equipmentTypes: TEquipmentType[];
};

export default function EquipmentTypesList(props: EquipmentTypesListProps) {
  return (
    <>
      <Table>
        <TableCaption>Listado de tipos de equipos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Tipo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.equipmentTypes.map((equipmentType) => (
            <TableRow key={equipmentType.equipment_type_id}>
              <TableCell className="font-medium">
                {equipmentType.name}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="secondary">Editar</Button>
                <Button variant="destructive">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              {props.equipmentTypes.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
