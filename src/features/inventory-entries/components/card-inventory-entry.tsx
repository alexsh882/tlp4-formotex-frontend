import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { TInventoryEntry } from "../interfaces/inventory-entry";
import { Button } from "@/components/shadcn/ui/button";
import InventoryEntryOutModal from "./inventory-entry-out-modal";
import { es } from "date-fns/locale";
import BadgeStatus from "./badge-status";
import ItemEntry from "@/features/common/components/item-entry";
import { formatDateToString, formatDateUTC } from "@/lib/utils";

type CardInventoryEntryProps = {
  inventoryEntry: TInventoryEntry;
};

export default function CardInventoryEntry({
  inventoryEntry,
}: CardInventoryEntryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingreso</CardTitle>
        <CardDescription>Información relacionada al ingreso</CardDescription>
      </CardHeader>
      <CardContent className="px-8 space-y-4">
        <ItemEntry
          label="Fecha de ingreso"
          value={formatDateToString(inventoryEntry.date_in)}
        />
        <ItemEntry
          label="Fecha de egreso"
          value={
            inventoryEntry.date_out
              ? formatDateToString(inventoryEntry.date_out)
              : "Aun está en el depósito"
          }
        />
        <ItemEntry
          label="Estado del equipo"
          value={<BadgeStatus status={inventoryEntry.status} />}
        />
        <ItemEntry label="Depósito" value={inventoryEntry.inventory.name} />
        <ItemEntry
          label="Ingresado por"
          value={inventoryEntry.user?.names ?? "Sin usuario"}
        />
        <ItemEntry label="Observaciones" value={inventoryEntry.observations} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="default"
          onClick={() => {
            window.print();
          }}
        >
          Imprimir etiqueta
        </Button>
        <InventoryEntryOutModal inventoryEntry={inventoryEntry} />
      </CardFooter>
    </Card>
  );
}
