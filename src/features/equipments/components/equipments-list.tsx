import { TEquipment } from "../interfaces/equipment";
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
import EquipmentModal from "./equipment-modal";

type EquipmentsListProps = {
  equipments: TEquipment[];
};

export default function EquipmentList(props: EquipmentsListProps) {
  return (
    <>
      <Table>
        <TableCaption>Listado de Equipos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Marca</TableHead>
            <TableHead className="">Modelo</TableHead>
            <TableHead className="">Tipo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.equipments.map((equipment) => (
            <TableRow key={equipment.equipment_id}>
              <TableCell className="font-medium">
                {equipment.make.name}
              </TableCell>
              <TableCell className="">{equipment.model}</TableCell>
              <TableCell className="">
                {equipment.equipment_type.name}
              </TableCell>
              <TableCell className="space-x-2 text-right">
                <EquipmentModal
                  equipment={equipment}
                  button={<Button variant="secondary">Editar</Button>}
                />
                <Button variant="destructive">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {props.equipments.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
