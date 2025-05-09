/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";

import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/login_schema";
import { loginAction } from "@/action/auth/LoginAction";

function SignInForm() {
  const route = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);

    try {
      const res = await loginAction(values);
      if (res.status === "success") {
        toast.success(res.message);
        route.push("/");
      } else if (res.status === "unauthorized") {
        toast.error(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Login failed!");
      //console.log("Login error: ", error);
    }
    //console.log(values);
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 animate-slide-in"
      >
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  disabled={isSubmitting}
                  {...field}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  disabled={isSubmitting}
                  {...field}
                  className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300"
          type="submit"
          size={"lg"}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="loader h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              <span>Signing In...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SignInForm;
