// app/auth.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { Session } from "next-auth"

// Define custom session type
interface CustomSession extends Session {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
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
  callbacks: {
    async session({ session, token }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      } as CustomSession
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signOut: '/auth/signout'
  }
})

// Re-export the helper type
export type { CustomSession }
