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
import { createEquipmentType, updateEquipmentType } from "../services/equipment-types";
import { equipmentTypeSchema } from "../schema/equipment-types";
import { TEquipmentType, TEquipmentTypeCreate, TEquipmentTypeUpdate } from "../interfaces/equipment-type";
  
  type EquipmentTypeFormProps = {
    equipmentType?: TEquipmentType;
    handleOpenChange: (open: boolean) => void;
    setErrorMessage: (message: string | null) => void;
  };
  
  export default function EquipmentTypeForm({
    equipmentType,
    handleOpenChange,
    setErrorMessage,
  }: EquipmentTypeFormProps) {
    const queryClient = useQueryClient();
  
    const { toast } = useToast();
  
    const form = useForm<z.infer<typeof equipmentTypeSchema>>({
      resolver: zodResolver(equipmentTypeSchema),
      defaultValues: {
        equipment_type_id: equipmentType?.equipment_type_id || '',
        name: equipmentType?.name || '',
      },
    });
  
    const { mutateAsync: mutateAsyncCreate } = useMutation({
      mutationKey: ["equipment-types"],
      mutationFn: createEquipmentType,
    });
  
    const { mutateAsync: mutateAsyncUpdate } = useMutation({
      mutationKey: ["equipment-types", equipmentType?.equipment_type_id],
      mutationFn: updateEquipmentType,
    });
  
    const handleSubmit = async (values: z.infer<typeof equipmentTypeSchema>) => {
      try {
        console.log("values: ", values);
  
        await (equipmentType?.equipment_type_id
          ? mutateAsyncUpdate(values as TEquipmentTypeUpdate)
          : mutateAsyncCreate(values as TEquipmentTypeCreate));
  
        handleOpenChange(false);
  
        await queryClient.invalidateQueries({
          queryKey: ["equipment-types"],
          type: "all",
        });
        form.reset();
        toast({
          title: "Tipo de equipo guardado",
          description: "El tipo de equipo ha sido guardado exitosamente.",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data.message);
        }
      }
    };
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de equipo</FormLabel>
                <FormControl>
                  <Input placeholder="Marca" {...field} />
                </FormControl>
                <FormDescription>El nombre del tipo de equipo.</FormDescription>
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
  