import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

import { TEquipment } from "../interfaces/equipment";
import ItemEntry from "@/features/common/components/item-entry";

export default function CardEquipment({
  equipment,
  serial = "",
}: {
  equipment: TEquipment;
  serial: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipo</CardTitle>
        <CardDescription>Información del equipo</CardDescription>
      </CardHeader>
      <CardContent className="px-8 space-y-4">
        <ItemEntry label="Marca" value={equipment.make.name} />
        <ItemEntry label="Modelo" value={equipment.model} />
        <ItemEntry label="Características" value={equipment.characteristics} />
        <ItemEntry label="Número de serie" value={serial} />
      </CardContent>
    </Card>
  );
}
