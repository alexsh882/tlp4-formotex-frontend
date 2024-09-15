import { api } from "@/features/common/api";
import { TInventory } from "../interfaces/inventory";


type GetInventoriesParams = URLSearchParams | undefined;

export async function getInventories(params: GetInventoriesParams) {

  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TInventory[]>(
      `/api/inventories${paramsUrl}`
    );
    console.log("getInventories response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getInventories error: ", error);
    throw error;
  }
}
