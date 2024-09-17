import { api } from "@/features/common/api";
import { TEquipmentType, TEquipmentTypeCreate, TEquipmentTypeUpdate } from "../interfaces/equipment-type";

type GetEquipmentTypesParams = URLSearchParams | undefined;

export async function getEquipmentTypes(params?: GetEquipmentTypesParams) {
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

export async function updateEquipmentType(
  equipmentType: TEquipmentTypeUpdate
) {
  try {
    const response = await api.patch<TEquipmentType>(
      `/api/equipment-types/${equipmentType.equipment_type_id}`,
      equipmentType
    );
    console.log("updateEquipmentType response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("updateEquipmentType error: ", error);
    throw error;
  }
}

export async function createEquipmentType(equipmentType: TEquipmentTypeCreate) {
  try {
    const response = await api.post<TEquipmentType>(
      "/api/equipment-types",
      equipmentType
    );
    console.log("createEquipmentType response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("createEquipmentType error: ", error);
    throw error;
  }
}

export async function deleteEquipmentType(equipment_type_id: string) {
  try {
    const response = await api.delete<TEquipmentType>(
      `/api/equipment-types/${equipment_type_id}`
    );
    console.log("deleteEquipmentType response: ", response.data);

    return response.data;
  } catch (error) {
    console.error("deleteEquipmentType error: ", error);
    throw error;
  }
}