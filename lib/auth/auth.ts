import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      // Guarda datos del usuario en el token cuando inicia sesión
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Copia datos del token a la sesión del cliente
      if (token) {
        // session.user = {
        //   id: token.id as string,
        //   email: token.email as string,
        //   name: token.name as string,
         
        // };
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          emailVerified: null, // Add emailVerified with a default value
        };
      }
      return session;
    },
  },
  ...authConfig,
});
