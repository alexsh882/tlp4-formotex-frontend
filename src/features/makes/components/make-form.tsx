import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { TMake, TMakeCreate, TMakeUpdate } from "../interfaces/make";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { makeSchema } from "../schema/make.schema";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMake, updateMake } from "../services/makes";
import { AxiosError } from "axios";
import { Button } from "@/components/shadcn/ui/button";
import { useToast } from "@/hooks/use-toast";

type MakeFormProps = {
  make?: TMake;
  handleOpenChange: (open: boolean) => void;
  setErrorMessage: (message: string | null) => void;
};

export default function MakeForm({
  make,
  handleOpenChange,
  setErrorMessage,
}: MakeFormProps) {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof makeSchema>>({
    resolver: zodResolver(makeSchema),
    defaultValues: {
      make_id: make?.make_id || '',
      name: make?.name || '',
    },
  });

  const { mutateAsync: mutateAsyncCreate } = useMutation({
    mutationKey: ["makes"],
    mutationFn: createMake,
  });

  const { mutateAsync: mutateAsyncUpdate } = useMutation({
    mutationKey: ["makes", make?.make_id],
    mutationFn: updateMake,
  });

  const handleSubmit = async (values: z.infer<typeof makeSchema>) => {
    try {
      console.log("values: ", values);

      await (make?.make_id
        ? mutateAsyncUpdate(values as TMakeUpdate)
        : mutateAsyncCreate(values as TMakeCreate));

      handleOpenChange(false);

      await queryClient.invalidateQueries({
        queryKey: ["makes"],
        type: "all",
      });
      form.reset();
      toast({
        title: "Marca guardada",
        description: "La marca ha sido guardada exitosamente.",
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
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input placeholder="Marca" {...field} />
              </FormControl>
              <FormDescription>El nombre de la marca.</FormDescription>
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
