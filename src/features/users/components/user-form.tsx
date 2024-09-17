import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  UserFormCreateSchema,
  UserFormUpdateSchema,
} from "../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RolesEnum } from "../consts/roles";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Button } from "@/components/shadcn/ui/button";
import { TUserCreate, TUserUpdate } from "../interfaces/user";
import { createUser, updateUser } from "../services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoles } from "@/features/roles/services/role";
import { AxiosError } from "axios";

type UserFormProps = {
  user?: TUserCreate | TUserUpdate;
  handleOpenChange: (open: boolean) => void;
};

export default function UserForm({ user, handleOpenChange }: UserFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<
    z.infer<typeof UserFormCreateSchema | typeof UserFormUpdateSchema>
  >({
    resolver: zodResolver(
      user?.user_id ? UserFormUpdateSchema : UserFormCreateSchema
    ),
    defaultValues: {
      user_id: user?.user_id || "",
      names: user?.names || "",
      username: user?.username || "",
      password: "",
      repeatPassword: "",
      role_id: user?.role_id || "",
    },
  });

  const {
    data: roles,
    isLoading: isLoadingRoles
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });

  const { mutateAsync: mutateAsyncCreate } = useMutation({
    mutationKey: ["users"],
    mutationFn: createUser,
  });

  const { mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationKey: ["users", user?.user_id],
    mutationFn: updateUser,
  });

  async function onSubmit(
    values: z.infer<typeof UserFormCreateSchema | typeof UserFormUpdateSchema>
  ) {
    try {
      await (user?.user_id
        ? mutateAsyncUpdate(values as TUserUpdate)
        : mutateAsyncCreate(values as TUserCreate));

      await queryClient.invalidateQueries({
        queryKey: ["users"],
        type: "all",
      });
      form.reset();
      handleOpenChange(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
      }
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="names"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Alejandro" {...field} />
                </FormControl>
                <FormDescription>Nombre completo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="example" {...field} />
                </FormControl>
                <FormDescription>Nombre de usuario.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("user_id") ? null : (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Ingresar contraseña.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetir contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="repetir password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ingrese nuevamente la contraseña.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="role_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar el Rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!isLoadingRoles &&
                      roles &&
                      roles.map((role) => (
                        <SelectItem key={role.role_id} value={role.role_id}>
                          {role.name === RolesEnum.USER
                            ? "Usuario"
                            : "Administrador"}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-2">
            <Button
              variant="destructive"
              type="button"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
