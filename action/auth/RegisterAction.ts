"use server";

import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/helpers/crypt";
import { registerSchema } from "@/schemas/login_schema";
import { z } from "zod";


type AuthResponse = {
    success: boolean;
    message: string;
    error?: string;
    status: 'success' | 'error' | 'unauthorized';
};

export async function registerAction(
    values: z.infer<typeof registerSchema>
  ): Promise<AuthResponse> {
    try {
      const { success, data, error } = registerSchema.safeParse(values);
  
      if (!success) {
        return {
          success: false,
          message: "Invalid input",
          error: error?.issues[0]?.message,
          status: "error",
        };
      }
  
      // Verificamos si el usuario ya existe
      const { name, email, password } = data;
  
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email.toLocaleLowerCase(),
        },
      });
  
      if (existingUser) {
        return {
          success: false,
          message: "User already exists",
          error: "User already exists",
          status: "error",
        };
      }
  
      //   Contraseña encriptada
      const hashedPassword = await hashPassword(password);
  
      await prisma.user.create({
        data: {
          email: email.toLocaleLowerCase(),
          name: name,
          password: hashedPassword,
        },
      });
  
      return {
        success: true,
        message: "User registered successfully",
        status: "success",
      };
    } catch (error) {
      return {
        success: false,
        message: `User registration failed`,
        error: error instanceof Error ? error.message : "Unknown error occurred",
        status: "error",
      };
    }
  }