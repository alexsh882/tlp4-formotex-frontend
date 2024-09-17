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

export async function createMake(make: TMake) {
  try {
    const response = await api.post<TMake>("/api/makes", make);
    console.log("createMake response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("createMake error: ", error);
    throw error;
  }
}

export async function updateMake(make: TMake) {
  try {
    const response = await api.patch<TMake>(`/api/makes/${make.make_id}`, make);
    console.log("updateMake response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("updateMake error: ", error);
    throw error;
  }
}