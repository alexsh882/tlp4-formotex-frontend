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
import { TUser } from "../interfaces/user";
import { Button } from "@/components/shadcn/ui/button";

type UserListProps = {
  users: TUser[];
};

export default function UserList(props: UserListProps) {
  console.log("UserList props: ", props);

  return (
    <>
      <Table>
        <TableCaption>Listado de usuarios del sistema.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Nombres</TableHead>
            <TableHead className="">Username</TableHead>
            <TableHead className="">Rol</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell className="font-medium">{user.names}</TableCell>
              <TableCell className="">{user.username}</TableCell>
              <TableCell className="">{user.user_role.name}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button variant="default">Ver</Button>
                <Button variant="secondary">Editar</Button>
                <Button variant="destructive">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">{props.users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
