import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { TMake } from "../interfaces/make";
import { Input } from "@/components/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { makeSchema } from "../schema/make.schema";
import { z } from "zod";

type MakeFormProps = {
  make?: TMake;
  submit: () => void;
};

export default function MakeForm({ make, submit }: MakeFormProps) {
  const form = useForm<z.infer<typeof makeSchema>>({
    resolver: zodResolver(makeSchema),
    defaultValues: {
      make_id: make?.make_id || "",
      name: make?.name || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input placeholder="Marca" {...field} />
              </FormControl>
              <FormDescription>Marca que se quiere agregar.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
