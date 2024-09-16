import { Button } from "@/components/shadcn/ui/button";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/shadcn/ui/table";
import { TMake } from "../interfaces/make";
import MakeModal from "./make-modal";

type MakesListProps = {
  makes: TMake[];
};

export default function MakesList(props: MakesListProps) {
  return (
    <>
      <Table>
        <TableCaption>Listado de tipos de equipos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Tipo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.makes.map((make) => (
            <TableRow key={make.make_id}>
              <TableCell className="font-medium">{make.name}</TableCell>
              <TableCell className="space-x-2 text-right">
                <MakeModal
                  button={<Button variant="secondary">Editar</Button>}
                  make={make}
                />
                <Button variant="destructive">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">{props.makes.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
