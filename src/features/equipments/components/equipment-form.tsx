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
import { equipmentSchema } from "../schema/equipment.schema";
import { createEquipment, updateEquipment } from "../services/equipments";
import {
  TEquipment,
  TEquipmentCreate,
  TEquipmentUpdate,
} from "../interfaces/equipment";
import { getEquipmentTypes } from "@/features/equipment-types/services/equipment-types";
import { getMakes } from "@/features/makes/services/makes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Textarea } from "@/components/shadcn/ui/textarea";

type EquipmentFormProps = {
  equipment?: TEquipment;
  handleOpenChange: (open: boolean) => void;
  setErrorMessage: (message: string | null) => void;
};

export default function EquipmentForm({
  equipment,
  handleOpenChange,
  setErrorMessage,
}: EquipmentFormProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof equipmentSchema>>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      equipment_id: equipment?.equipment_id || undefined,
      model: equipment?.model || "",
      characteristics: equipment?.characteristics || "",
      equipment_type_id: equipment?.equipment_type_id || "",
      make_id: equipment?.make_id || "",
    },
  });

  const { data: equipmentTypes, isLoading: isLoadingTypes } = useQuery({
    queryKey: ["equipment-types"],
    queryFn: () => getEquipmentTypes(),
  });

  const { data: makes, isLoading: isLoadingMakes } = useQuery({
    queryKey: ["makes"],
    queryFn: () => getMakes(),
  });

  const { mutateAsync: mutateAsyncCreate } = useMutation({
    mutationKey: ["equipments"],
    mutationFn: createEquipment,
  });

  const { mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationKey: ["equipments", equipment?.equipment_id],
    mutationFn: updateEquipment,
  });

  const handleSubmit = async (values: z.infer<typeof equipmentSchema>) => {
    try {
      console.log("values: ", values);

      await (equipment?.equipment_id
        ? mutateAsyncUpdate(values as TEquipmentUpdate)
        : mutateAsyncCreate(values as TEquipmentCreate));

      handleOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["equipments"],
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
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input placeholder="Modelo" {...field} />
              </FormControl>
              <FormDescription>El nombre del Modelo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="make_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar marca" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!isLoadingMakes &&
                    makes &&
                    makes.map((make) => (
                      <SelectItem key={make.make_id} value={make.make_id}>
                        {make.name}
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
          name="equipment_type_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!isLoadingTypes &&
                    equipmentTypes &&
                    equipmentTypes.map((equipmentType) => (
                      <SelectItem
                        key={equipmentType.equipment_type_id}
                        value={equipmentType.equipment_type_id}
                      >
                        {equipmentType.name}
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
          name="characteristics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Características</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Características del equipo."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
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
