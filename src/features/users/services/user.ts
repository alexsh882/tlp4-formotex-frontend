import { api } from "@/features/common/api";
import { TUser, TUserCreate, TUserUpdate } from "../interfaces/user";

type GetUsersParams = URLSearchParams | undefined;

export async function getUsers(params: GetUsersParams) {
  const paramsUrl = params?.size ? "?" + params.toString() : "";

  const response = await api.get<TUser[]>(`/api/users${paramsUrl}`);

  return response.data;
}

export async function updateUser(user: TUserUpdate) {
  const response = await api.patch<TUserUpdate>(
    `/api/users/${user.user_id}`,
    user
  );

  return response.data;
}

export async function createUser(user: TUserCreate) {
  const response = await api.post<TUserCreate>("/api/users", user);

  return response.data;
}

export async function deleteUser(user_id: string) {
  const response = await api.delete(`/api/users/${user_id}`);

  return response.data;
}
