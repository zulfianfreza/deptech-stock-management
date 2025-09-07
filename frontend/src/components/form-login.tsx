"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { COOKIE_KEY } from "@/constant/common.constant";
import { setCookie } from "@/lib/cookie";
import { cn } from "@/lib/utils";
import { useAuthLogin } from "@/services/hooks/use-auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { setErrorMap } from "zod/v3";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TSchema = z.infer<typeof schema>;

export function FormLogin({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useAuthLogin();

  const actualSubmit: SubmitHandler<TSchema> = useCallback(
    async (values) => {
      login.mutate(values, {
        onSuccess: (res) => {
          setCookie(COOKIE_KEY.ACCESS_TOKEN, res.data.access_token);
          window.location.replace("/");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            setErrorMap(error.response?.data?.message);
          }
        },
      });
    },
    [login]
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(actualSubmit)}>
              <div className="flex flex-col gap-6">
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
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
