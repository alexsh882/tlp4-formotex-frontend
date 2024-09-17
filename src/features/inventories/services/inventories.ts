import { api } from "@/features/common/api";
import { TInventory, TInventoryCreate, TInventoryUpdate } from "../interfaces/inventory";

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

export async function createInventory(inventory: TInventoryCreate) {
  try {
    const response = await api.post<TInventoryCreate>("/api/inventories", inventory);
    console.log("createInventory response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("createInventory error: ", error);
    throw error;
  }
}

export async function updateInventory(inventory: TInventoryUpdate) {
  try {
    const response = await api.patch<TInventoryUpdate>(
      `/api/inventories/${inventory.inventory_id}`,
      inventory
    );
    console.log("updateInventory response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("updateInventory error: ", error);
    throw error;
  }
}

export async function deleteInventory(inventory_id: string) {
  try {
    const response = await api.delete<TInventory>(`/api/inventories/${inventory_id}`);
    console.log("deleteInventory response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("deleteInventory error: ", error);
    throw error;
  }
}