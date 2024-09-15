import { api } from "@/features/common/api";

import { TInventoryEntries } from "../interfaces/inventory-entry";

type GetInventoryEntriesParams = URLSearchParams | undefined;

export async function getInventoryEntries(params: GetInventoryEntriesParams) {

  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TInventoryEntries[]>(
      `/api/inventory-entries${paramsUrl}`
    );
    console.log("getInventoryEntries response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getInventoryEntries error: ", error);
    throw error;
  }
}
