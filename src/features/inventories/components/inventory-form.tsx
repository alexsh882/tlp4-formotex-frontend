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
  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { AxiosError } from "axios";
  import { Button } from "@/components/shadcn/ui/button";
  import { useToast } from "@/hooks/use-toast";
import { TInventory, TInventoryCreate, TInventoryUpdate } from "../interfaces/inventory";
import { inventorySchema } from "../schema/inventory.schema";
import { createInventory, updateInventory } from "../services/inventories";
  
  type InventoryFormProps = {
    inventory?: TInventory;
    handleOpenChange: (open: boolean) => void;
    setErrorMessage: (message: string | null) => void;
  };
  
  export default function InventoryForm({
    inventory,
    handleOpenChange,
    setErrorMessage,
  }: InventoryFormProps) {
    const queryClient = useQueryClient();
  
    const { toast } = useToast();
  
    const form = useForm<z.infer<typeof inventorySchema>>({
      resolver: zodResolver(inventorySchema),
      defaultValues: {
        inventory_id: inventory?.inventory_id || undefined,
        name: inventory?.name || '',
      },
    });
  
    const { mutateAsync: mutateAsyncCreate } = useMutation({
      mutationKey: ["inventories"],
      mutationFn: createInventory,
    });
  
    const { mutateAsync: mutateAsyncUpdate } = useMutation({
      mutationKey: ["inventories", inventory?.inventory_id],
      mutationFn: updateInventory,
    });
  
    const handleSubmit = async (values: z.infer<typeof inventorySchema>) => {
        
      try {
        await (inventory?.inventory_id
          ? mutateAsyncUpdate(values as TInventoryUpdate)
          : mutateAsyncCreate(values as TInventoryCreate));
  
        handleOpenChange(false);
  
        await queryClient.invalidateQueries({
          queryKey: ["inventories"],
          type: "all",
        });
        form.reset();
        toast({
          title: "Inventario guardado",
          description: "El inventario ha sido guardado exitosamente.",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data.message);
        }
      }
    };

    console.log(form.formState.errors);
    
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventario</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormDescription>El nombre del inventario.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <div className="space-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Form>
    );
  }
  