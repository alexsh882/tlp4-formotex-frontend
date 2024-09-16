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
import { TInventoryEntries } from "../interfaces/inventory-entry";

import { formatDateUTC } from "@/lib/utils";
import BadgeStatus from "./badge-status";

type InventoriesListProps = {
  inventoryEntries: TInventoryEntries[];
};

export default function InventoryEntriesList(props: InventoriesListProps) {
  return (
    <>
      <Table>
        <TableCaption>Listado de depósitos activos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Fecha ingreso</TableHead>
            <TableHead className="">Equipo</TableHead>
            <TableHead className="">Estado</TableHead>
            <TableHead className="">Depósito</TableHead>
            <TableHead className="">Ingresado por</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.inventoryEntries.map((inventoryEntries) => (
            <TableRow key={inventoryEntries.inventory_entry_id}>
              <TableCell className="">
                {formatDateUTC(inventoryEntries.date_in)}
              </TableCell>
              <TableCell
                title={inventoryEntries.equipment.characteristics}
                className=""
              >
                {inventoryEntries.equipment.make.name +
                  " - " +
                  inventoryEntries.equipment.model}
              </TableCell>
              <TableCell className="">
                <BadgeStatus status={inventoryEntries.status} />
              </TableCell>
              <TableCell className="">
                {inventoryEntries.inventory.name}
              </TableCell>
              <TableCell className="">
                {inventoryEntries.user?.names ?? "Sin usuario"}
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
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">
              {props.inventoryEntries.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
