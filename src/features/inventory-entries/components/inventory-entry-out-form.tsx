import { useForm } from "react-hook-form";
import { TInventoryEntry } from "../interfaces/inventory-entry";
import { inventoryEntryOutSchema } from "../schema/intentory-entry.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Button } from "@/components/shadcn/ui/button";
import { cn, formatDateToString } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { updateInventoryEntry } from "../services/inventory-entries";
import { AxiosError } from "axios";

type InventoryEntryOutProps = {
  handleOpenChange: (open: boolean) => void;
  setErrorMessage: (message: string | null) => void;
  inventoryEntry: TInventoryEntry;
};

export default function InventoryEntryOutForm(props: InventoryEntryOutProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof inventoryEntryOutSchema>>({
    resolver: zodResolver(inventoryEntryOutSchema),

    defaultValues: {
      date_in: props.inventoryEntry?.date_in,
      date_out: undefined,
    },
  });

  const { mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationKey: ["inventory-entry", props.inventoryEntry?.inventory_entry_id],
    mutationFn: updateInventoryEntry,
  });

  const handleSubmit = async (
    values: z.infer<typeof inventoryEntryOutSchema>
  ) => {
    try {
      const updatedInventoryEntry = await mutateAsyncUpdate({
        inventory_entry_id: props.inventoryEntry?.inventory_entry_id,
        date_out: values.date_out,
      });

      console.log(updatedInventoryEntry.inventory_entry_id);

      queryClient.invalidateQueries({
        queryKey: ["inventory-entry", props.inventoryEntry?.inventory_entry_id],
        type: "all",
      });

      props.handleOpenChange(false);

      toast({
        title: "Salida de inventario",
        description: "Se ha dado salida al equipo correctamente",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        return props.setErrorMessage(error?.response?.data.message);
      }
      return props.setErrorMessage("Ocurrió un error al dar salida al equipo");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="date_out"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center col-span-2">
              <FormLabel className="w-full">Fecha de Egreso</FormLabel>
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
                        ? formatDateToString(field.value, "long")
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
        <div className="space-x-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => props.handleOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
