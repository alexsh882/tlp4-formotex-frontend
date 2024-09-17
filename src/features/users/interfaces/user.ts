
export type TUser = {
  user_id: string;
  names: string;
  username: string;
  role_id: string;
  user_role: {
    role_id: string;
    name: string;
  };
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type TUserCreate = Omit<
  TUser,
  "created_at" | "updated_at" | "user_role" | "deleted_at"
>;

export type TUserUpdate = Partial<TUser>;
