import { api } from "@/features/common/api";
import { TUser } from "../interfaces/user";

type GetUsersParams = URLSearchParams | undefined;

export async function getUsers(params: GetUsersParams) {
  const paramsUrl = params?.size ? "?" + params.toString() : "";

  const response = await api.get<TUser[]>(`/api/users${paramsUrl}`);

  return response.data;
}
