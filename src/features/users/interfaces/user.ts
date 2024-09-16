import { Roles } from "@/features/auth/constants/roles";

export type TUser = {
  user_id: string;
  names: string;
  username: string;
  user_role: {
    name: Roles;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};
