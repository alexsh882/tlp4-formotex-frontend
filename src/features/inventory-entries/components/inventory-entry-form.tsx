import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Button } from "@/components/shadcn/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  EquipmentStatusLabels,
  TInventoryEntry,
  TInventoryEntryCreate,
  TInventoryEntryUpdate,
} from "../interfaces/inventory-entry";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { inventoryEntrySchema } from "../schema/intentory-entry.schema";
import { getEquipments } from "@/features/equipments/services/equipments";
import { getInventories } from "@/features/inventories/services/inventories";
import {
  createInventoryEntry,
  updateInventoryEntry,
} from "../services/inventory-entries";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/ui/command";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

type InventoryEntryFormProps = {
  inventoryEntry?: TInventoryEntry;
};

export default function InventoryEntryForm({
  inventoryEntry,
}: InventoryEntryFormProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const [openSelectEquip, setOpenSelectEquip] = useState(false);

  const navigation = useNavigate();
  const form = useForm<z.infer<typeof inventoryEntrySchema>>({
    resolver: zodResolver(inventoryEntrySchema),
    defaultValues: {
      serial: inventoryEntry?.serial || "",
      status: inventoryEntry?.status || undefined,
      date_in: inventoryEntry?.date_in || undefined,
      date_out: inventoryEntry?.date_out || undefined,
      observations: inventoryEntry?.observations || "",
      equipment_id: inventoryEntry?.equipment_id || undefined,
      inventory_id: inventoryEntry?.inventory_id || undefined,
    },
  });

  const { data: equipments, isLoading: isLoadingEquipments } = useQuery({
    queryKey: ["equipments"],
    queryFn: () => getEquipments(),
  });

  const { data: inventories, isLoading: isLoadingInventories } = useQuery({
    queryKey: ["inventories"],
    queryFn: () => getInventories(),
  });

  const { mutateAsync: mutateAsyncCreate } = useMutation({
    mutationKey: ["inventory-entries"],
    mutationFn: createInventoryEntry,
  });

  const { mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationKey: ["inventory-entries", inventoryEntry?.inventory_entry_id],
    mutationFn: updateInventoryEntry,
  });

  const handleSubmit = async (values: z.infer<typeof inventoryEntrySchema>) => {
    try {
      console.log("values: ", values);

      await (inventoryEntry?.inventory_entry_id
        ? mutateAsyncUpdate(values as TInventoryEntryUpdate)
        : mutateAsyncCreate(values as TInventoryEntryCreate));

      await queryClient.invalidateQueries({
        queryKey: ["inventory-entries"],
        type: "all",
      });

      form.reset();

      navigation("/inventory-entries");

      toast({
        title: "Ingreso registrado",
        description: "El ingreso ha sido guardado exitosamente.",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        // setErrorMessage(error.response?.data.message);
      }
    }
  };

  console.log("form: ", form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 lg:grid-cols-6  gap-2"
      >
        <FormField
          control={form.control}
          name="serial"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>Serial Nro</FormLabel>
              <FormControl>
                <Input placeholder="Serial Nro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipment_id"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-3">
              <FormLabel>Equipo</FormLabel>
              <Popover open={openSelectEquip} onOpenChange={setOpenSelectEquip}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? equipments &&
                          equipments.find(
                            (equipment) =>
                              equipment.equipment_id === field.value
                          )?.make.name +
                            " - " +
                            equipments.find(
                              (equipment) =>
                                equipment.equipment_id === field.value
                            )?.model
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h- w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Buscar" className="h-9" />
                    <CommandList>
                      <CommandEmpty>No se encontraron equipos.</CommandEmpty>
                      <CommandGroup>
                        {!isLoadingEquipments &&
                          equipments &&
                          equipments.map((equipment) => (
                            <CommandItem
                              value={
                                equipment.make.name + " - " + equipment.model
                              }
                              key={equipment.equipment_id}
                              onSelect={() => {
                                form.setValue(
                                  "equipment_id",
                                  equipment.equipment_id
                                );
                                setOpenSelectEquip(false);
                              }}
                            >
                              {equipment.make.name} - {equipment.model}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  equipment.equipment_id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inventory_id"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-2">
              <FormLabel>Inventario</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar inventario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!isLoadingInventories &&
                    inventories &&
                    inventories.map((inventory) => (
                      <SelectItem
                        key={inventory.inventory_id}
                        value={inventory.inventory_id}
                      >
                        {inventory.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-2">
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar inventario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EquipmentStatusLabels &&
                    EquipmentStatusLabels.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_in"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center col-span-2">
              <FormLabel className="w-full">Fecha de Ingreso</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? format(field.value, "PPP", { locale: es })
                        : "Selecciona una fecha"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem className="col-span-2 lg:col-span-6">
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observaciones del ingreso"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-2 lg:col-span-6">
          <Link to="/inventory-entries">
            <Button type="button" variant="destructive">
              Cancelar
            </Button>
          </Link>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
