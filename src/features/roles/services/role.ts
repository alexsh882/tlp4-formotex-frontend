import { api } from "@/features/common/api";
import { TRole } from "../interfaces/role";

type GetRoleParams = URLSearchParams | undefined;

export async function getRoles(params?: GetRoleParams) {
  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TRole[]>(`/api/roles${paramsUrl}`);
    console.log("getRole response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getRole error: ", error);
    throw error;
  }
}
