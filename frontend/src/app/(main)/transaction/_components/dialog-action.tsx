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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProducts } from "@/services/hooks/use-product.service";
import { useCreateTransaction } from "@/services/hooks/use-transaction.service";
import { TDialogMode } from "@/types/common.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TProps = {
  open: boolean;
  toggle: () => void;
  mode?: TDialogMode;
};
const schema = z.object({
  productId: z.string(),
  type: z.enum(["in", "out"]),
  quantity: z.number(),
});

type TSchema = z.infer<typeof schema>;

export default function DialogAction({ open, toggle, mode }: TProps) {
  const queryClient = useQueryClient();
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const { data: products } = useGetProducts();

  const createCategory = useCreateTransaction({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-transaction"] });
      toggle();
      form.reset();
      toast.success("Transaction created successfully");
    },
  });

  const actualSubmit: SubmitHandler<TSchema> = useCallback(
    (values) => {
      createCategory.mutate({
        ...values,
      });
    },
    [createCategory]
  );

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add" : "Edit"} Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(actualSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>

                      <SelectContent>
                        {products?.data.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in">In</SelectItem>
                        <SelectItem value="out">Out</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const { value } = e.target;

                        field.onChange(Number(value));
                      }}
                    />
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
