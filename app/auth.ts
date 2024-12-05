import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { DefaultSession, Session } from "next-auth"

// Extend next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role?: string
    } & DefaultSession["user"]
  }

  interface User {
    role?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string
    role?: string
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.role = "user"
      }
      return token
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string | undefined
      }
      return session
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/auth/dashboard") return !!auth
      return true
    },
  }
})
