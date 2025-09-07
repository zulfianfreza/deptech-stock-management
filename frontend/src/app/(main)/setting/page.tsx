"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAuthGetMe,
  useAuthUpdatePassword,
  useAuthUpdateProfile,
} from "@/services/hooks/use-auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schemaProfile = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  dob: z.date(),
  gender: z.string(),
});

const schemaPassword = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

type TSchemaProfile = z.infer<typeof schemaProfile>;
type TSchemaPassword = z.infer<typeof schemaPassword>;

export default function SettingPage() {
  const queryClient = useQueryClient();
  const formProfile = useForm<TSchemaProfile>({
    resolver: zodResolver(schemaProfile),
    defaultValues: {},
  });
  const formPassword = useForm<TSchemaPassword>({
    resolver: zodResolver(schemaPassword),
    defaultValues: {},
  });

  const { data: user } = useAuthGetMe();

  const updateProfile = useAuthUpdateProfile({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
      formProfile.reset();
      toast.success("Profile updated successfully");
    },
  });

  const updatePassword = useAuthUpdatePassword({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
      formPassword.resetField("currentPassword");
      formPassword.resetField("newPassword");
      toast.success("Password updated successfully");
    },
  });

  const handleUpdateProfile: SubmitHandler<TSchemaProfile> = useCallback(
    (values) => {
      updateProfile.mutate({
        ...values,
        dob: format(values.dob, "yyyy-MM-dd"),
      });
    },
    [updateProfile]
  );

  const handleUpdatePassword: SubmitHandler<TSchemaPassword> = useCallback(
    (values) => {
      updatePassword.mutate({
        ...values,
      });
    },
    [updatePassword]
  );

  useEffect(() => {
    if (user) {
      formProfile.reset({
        dob: new Date(user.data.dob),
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        gender: user.data.gender,
      });
    }
  }, [user]);

  return (
    <div className=" p-4 flex flex-col gap-4">
      <div className="flex">
        <h1 className=" text-2xl">Setting</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Form {...formProfile}>
            <form onSubmit={formProfile.handleSubmit(handleUpdateProfile)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={formProfile.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formProfile.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
                <div className=" space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.data.email} readOnly disabled />
                </div>
                <FormField
                  control={formProfile.control}
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
                  control={formProfile.control}
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
                <Button>Save</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="password">
          <Form {...formPassword}>
            <form onSubmit={formPassword.handleSubmit(handleUpdatePassword)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={formPassword.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <Input {...field} type="password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formPassword.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <Input {...field} type="password" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button>Save</Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
