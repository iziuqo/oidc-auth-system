import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role?: string
    } & DefaultSession["user"]
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
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub ?? ''
        session.user.role = 'user'
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // After sign in, redirect to dashboard
      if (url === baseUrl) {
        return `${baseUrl}/auth/dashboard`
      }
      // If on the same origin, allow the redirect
      if (url.startsWith(baseUrl)) {
        return url
      }
      // Default redirect to dashboard
      return `${baseUrl}/auth/dashboard`
    }
  }
})
