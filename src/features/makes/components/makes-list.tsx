import { Button } from "@/components/shadcn/ui/button";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/shadcn/ui/table";
import { TMake } from "../interfaces/make";

type MakesListProps = {
  makes: TMake[];
};

export default function MakesList(props: MakesListProps) {
    return  <>
    <Table>
      <TableCaption>Listado de tipos de equipos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Tipo</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.makes.map((make) => (
          <TableRow key={make.make_id}>
            <TableCell className="font-medium">
              {make.name}
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
            {props.makes.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </>
}
