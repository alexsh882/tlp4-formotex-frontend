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
import UserModal from "./user-modal";
import { RolesEnum } from "../consts/roles";
import UserDeleteButton from "./user-delete-button";

type UserListProps = {
  users: TUser[];
};

export default function UserList(props: UserListProps) {
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
                <UserModal
                  button={<Button variant="secondary">Editar</Button>}
                  user={{
                    ...user,
                    role_id: user.user_role.role_id,
                  }}
                />
                <UserDeleteButton user_id={user.user_id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{props.users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
