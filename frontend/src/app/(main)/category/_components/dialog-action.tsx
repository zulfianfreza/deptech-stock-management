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
  useCreateCategory,
  useUpdateCategory,
} from "@/services/hooks/use-category.service";
import { TCategory } from "@/types/category.type";
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
  data?: TCategory;
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

  const createCategory = useCreateCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
      toggle();
      form.reset();
      toast.success("Category created successfully");
    },
  });

  const updateCategory = useUpdateCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
      toggle();
      form.reset();
      toast.success("Category updated successfully");
    },
  });

  const actualSubmit: SubmitHandler<TSchema> = useCallback(
    (values) => {
      if (mode === "edit" && data) {
        updateCategory.mutate({ id: data.id, payload: values });
      } else {
        createCategory.mutate({
          ...values,
        });
      }
    },
    [createCategory, mode, data, updateCategory]
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
          <DialogTitle>{mode === "add" ? "Add" : "Edit"} Category</DialogTitle>
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
