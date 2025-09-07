"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateAdmin } from "@/services/hooks/use-admin.service";
import { TDialogMode } from "@/types/common.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z.date(),
  gender: z.string(),
  password: z.string(),
});

type TSchema = z.infer<typeof schema>;

export default function DialogAction({ open, toggle, mode }: TProps) {
  const queryClient = useQueryClient();
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const createAdmin = useCreateAdmin({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-admin"] });
      toggle();
      form.reset();
      toast.success("Admin created successfully");
    },
  });

  const actualSubmit: SubmitHandler<TSchema> = useCallback(
    (values) => {
      createAdmin.mutate({
        ...values,
        dob: format(values.dob, "yyyy-MM-dd"),
      });
    },
    [createAdmin]
  );

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add" : "Edit"} Admin</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(actualSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} type="password" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          data-empty={!field.value}
                          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {field.value ? (
                            format(field.value, "dd MMMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
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
