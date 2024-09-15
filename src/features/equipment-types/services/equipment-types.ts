import { api } from "@/features/common/api";
import { TEquipmentType } from "../interfaces/equipment-type";


type GetEquipmentTypesParams = URLSearchParams | undefined;

export async function getEquipmentTypes(params: GetEquipmentTypesParams) {

  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TEquipmentType[]>(
      `/api/equipment-types${paramsUrl}`
    );
    console.log("getEquipmentTypes response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getEquipmentTypes error: ", error);
    throw error;
  }
}
