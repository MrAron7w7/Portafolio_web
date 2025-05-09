/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
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

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/login_schema";
import { registerAction } from "@/action/auth/RegisterAction";

function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsSubmitting(true);
    try {
      const res = await registerAction(values);

      if (res.status === "success") {
        toast.success(res.message);
        route.push("/auth/login");
      } else if (res.status === "unauthorized") {
        toast.error(res.message);
      } else {
        console.log(res.error);
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong during registration");
    }

    setIsSubmitting(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 animate-slide-in"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your name"
                  {...field}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  {...field}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
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
                  {...field}
                  className="transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300"
          type="submit"
          size={"lg"}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="loader h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              <span>Signing Up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
