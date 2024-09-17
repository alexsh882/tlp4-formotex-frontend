import { api } from "@/features/common/api";

import { TInventoryEntry, TInventoryEntryCreate, TInventoryEntryUpdate } from "../interfaces/inventory-entry";

type GetInventoryEntriesParams = URLSearchParams | undefined;

export async function getInventoryEntries(params: GetInventoryEntriesParams) {

  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TInventoryEntry[]>(
      `/api/inventory-entries${paramsUrl}`
    );
    console.log("getInventoryEntries response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getInventoryEntries error: ", error);
    throw error;
  }
}

export async function createInventoryEntry(data: TInventoryEntryCreate) {
  try {
    const response = await api.post<TInventoryEntryCreate>("/api/inventory-entries", data);
    console.log("createInventoryEntry response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("createInventoryEntry error: ", error);
    throw error;
  }
}

export async function updateInventoryEntry(inventoryEntry: TInventoryEntryUpdate) {
  try {
    const response = await api.patch<TInventoryEntryUpdate>(
      `/api/inventory-entries/${inventoryEntry.inventory_entry_id}`,
      inventoryEntry
    );
    console.log("updateInventoryEntry response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("updateInventoryEntry error: ", error);
    throw error;
  }
}
