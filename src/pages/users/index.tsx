import { Button } from "@/components/shadcn/ui/button";
import UserList from "@/features/users/components/user-list";
import UserModal from "@/features/users/components/user-modal";
import { getUsers } from "@/features/users/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function UsersPage() {
  const [params, setParams] = useSearchParams();

  // const mergeParams = (obj: Record<string, string>) => {
  //   const newParams = new URLSearchParams(params);
  //   for (const [key, value] of Object.entries(obj)) {
  //     newParams.set(key, value);
  //   }
  //   setParams(newParams);
  // };

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", params.toString()],
    queryFn: () => getUsers(params),
  });

  return (
    <>
      <hgroup className="flex justify-between">
        <h1 className="text-4xl font-sans-accent mb-6">
          Usuarios de la aplicación
        </h1>
        <UserModal button={<Button variant="default">Nuevo Usuario</Button>} />
      </hgroup>
      {isLoading && <p>Cargando...</p>}

      {!isLoading && users && <UserList users={users} />}
    </>
  );
}
