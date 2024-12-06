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

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          access_type: "offline",
          prompt: "select_account"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub ?? ''
        session.user.role = 'user'
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url
      } else if (url.startsWith("/")) {
        return `${baseUrl}${url}`
      }
      return baseUrl
    }
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config)
