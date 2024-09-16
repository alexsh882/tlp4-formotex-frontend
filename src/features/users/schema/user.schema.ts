import { z } from "zod";

const UserFormSchema = z.object({
  user_id: z.string().optional(),
  names: z.string().min(3).max(255),
  username: z.string().min(3).max(255),
  password: z.string().min(8),
  repeatPassword: z.string().min(8),
  role_id: z.string().uuid(),
});

export const UserFormCreateSchema = UserFormSchema.refine(
  (data) => data.password === data.repeatPassword,
  {
    message: "Las contraseñas no coinciden",
  }
);

export const UserFormUpdateSchema = UserFormSchema.omit({
  password: true,
  repeatPassword: true,
});
