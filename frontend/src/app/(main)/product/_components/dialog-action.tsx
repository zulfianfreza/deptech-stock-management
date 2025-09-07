"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProduct } from "@/services/hooks/use-product.service";
import { TProduct } from "@/types/product.type";
import { TDialogMode } from "@/types/common.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TProps = {
  open: boolean;
  toggle: () => void;
  mode?: TDialogMode;
  data?: TProduct;
};
const schema = z.object({
  name: z.string(),
  description: z.string(),
});

type TSchema = z.infer<typeof schema>;

export default function DialogAction({ open, toggle, mode, data }: TProps) {
  const queryClient = useQueryClient();
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const createProduct = useCreateProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-product"] });
      toggle();
      form.reset();
      toast.success("Product created successfully");
    },
  });

  const actualSubmit: SubmitHandler<TSchema> = useCallback(
    (values) => {
      createProduct.mutate({
        ...values,
      });
    },
    [createProduct]
  );

  useEffect(() => {
    if (mode === "edit" && data) {
      form.reset({
        name: data.name,
        description: data.description,
      });
    }
  }, [data, mode]);

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add" : "Edit"} Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(actualSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <Button>Add</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
