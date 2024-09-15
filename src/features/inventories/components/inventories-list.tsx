
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
import { TInventory } from "../interfaces/inventory";

type InventoriesListProps = {
  inventories: TInventory[];
};

export default function InventoriesList(props: InventoriesListProps) {
  return (
    <>
      <Table>
        <TableCaption>Listado de depósitos activos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Nombre</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.inventories.map((inventory) => (
            <TableRow key={inventory.inventory_id}>
              <TableCell className="font-medium">
                {inventory.name}
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
              {props.inventories.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
