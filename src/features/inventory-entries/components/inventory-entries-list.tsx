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
import { TInventoryEntry } from "../interfaces/inventory-entry";

import { formatDateUTC } from "@/lib/utils";
import BadgeStatus from "./badge-status";
import { useNavigate } from "react-router-dom";

type InventoriesListProps = {
  inventoryEntries: TInventoryEntry[];
};

export default function InventoryEntriesList(props: InventoriesListProps) {

  const navigate = useNavigate();

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
          {props.inventoryEntries.map((inventoryEntry) => (
            <TableRow key={inventoryEntry.inventory_entry_id}>
              <TableCell className="">
                {formatDateUTC(inventoryEntry.date_in.toString())}
              </TableCell>
              <TableCell
                title={inventoryEntry.equipment.characteristics}
                className=""
              >
                {inventoryEntry.equipment.make.name +
                  " - " +
                  inventoryEntry.equipment.model}
              </TableCell>
              <TableCell className="">
                <BadgeStatus status={inventoryEntry.status} />
              </TableCell>
              <TableCell className="">
                {inventoryEntry.inventory.name}
              </TableCell>
              <TableCell className="">
                {inventoryEntry.user?.names ?? "Sin usuario"}
              </TableCell>
              <TableCell className="space-x-2 text-right">
                <Button variant="secondary" onClick={() => navigate({pathname: `/inventory-entries/${inventoryEntry.inventory_entry_id}/edit`})}>Editar</Button>
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
