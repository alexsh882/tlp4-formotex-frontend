import { api } from "@/features/common/api";
import { TMake } from "../interfaces/make";

type GetMakesParams = URLSearchParams | undefined;

export async function getMakes(params: GetMakesParams) {
  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TMake[]>(`/api/makes${paramsUrl}`);
    console.log("getMakes response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getMakes error: ", error);
    throw error;
  }
}
