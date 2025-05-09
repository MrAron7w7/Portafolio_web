"use server";

import { z } from "zod";
import { loginSchema } from "@/schemas/login_schema";
import { signIn } from "@/lib/auth/auth";
import { compare} from "@/lib/helpers/crypt";
import { prisma } from "@/lib/db/prisma";


type AuthResponse = {
    success: boolean;
    message: string;
    error?: string;
    status: 'success' | 'error' | 'unauthorized';
};

export async function loginAction(
    values: z.infer<typeof loginSchema>
): Promise<AuthResponse> {
    try {
        const { data, success } = loginSchema.safeParse(values);

        if (!success) {
            return {
                success: false,
                message: "Validation failed",
                error: "Validation failed",
                status: 'error'
            };
        }

        const { email, password } = data;

        const existingUser = await prisma.user.findFirst({
              where: {
                email: email,
              },
        });
        
        if (!existingUser) {
            return {
              success: false,
              message: "User not found",
              error: "User not found",
              status: "error",
            };
          }

          const passwordMatch = await compare(
            password,
            existingUser.password as string
      );
      
      console.log({passwordMatch})
        
        if (!passwordMatch) {
            return {
              success: false,
              message: "Invalid credentials",
              error: "Invalid credentials",
              status: "unauthorized",
            };
          }

        await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            // callbackUrl: "/dashboard"
        })

        return {
            success: true,
            message: "Logged in",
            status: 'success'
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : "Unknown error occurred",
            status: "error",
          };
    }
}