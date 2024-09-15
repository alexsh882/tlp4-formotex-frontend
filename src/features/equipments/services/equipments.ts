import { api } from "@/features/common/api";
import { TEquipment } from "../interfaces/equipment";


type GetEquipmentsParams = URLSearchParams | undefined;

export async function getEquipments(params: GetEquipmentsParams) {

  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TEquipment[]>(
      `/api/equipments${paramsUrl}`
    );
    console.log("getEquipments response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getEquipments error: ", error);
    throw error;
  }
}
