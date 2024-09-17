import { api } from "@/features/common/api";
import {
  TEquipment,
  TEquipmentCreate,
  TEquipmentUpdate,
} from "../interfaces/equipment";

type GetEquipmentsParams = URLSearchParams | undefined;

export async function getEquipments(params?: GetEquipmentsParams) {
  try {
    const paramsUrl = params ? "?" + params.toString() : "";

    const response = await api.get<TEquipment[]>(`/api/equipments${paramsUrl}`);
    console.log("getEquipments response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("getEquipments error: ", error);
    throw error;
  }
}

export async function createEquipment(data: TEquipmentCreate) {
  try {
    const response = await api.post<TEquipmentCreate>("/api/equipments", data);
    console.log("createEquipment response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("createEquipment error: ", error);
    throw error;
  }
}

export async function updateEquipment(equipment: TEquipmentUpdate) {
  try {
    const response = await api.patch<TEquipmentUpdate>(
      `/api/equipments/${equipment.equipment_id}`,
      equipment
    );
    console.log("updateEquipment response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("updateEquipment error: ", error);
    throw error;
  }
}

export async function deleteEquipment(equipment_id: string) {
  try {
    const response = await api.delete<TEquipment>(`/api/equipments/${equipment_id}`);
    console.log("deleteEquipment response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("deleteEquipment error: ", error);
    throw error;
  }
}