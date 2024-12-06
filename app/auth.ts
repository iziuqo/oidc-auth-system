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
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email_verified ?? false
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id
        token.accessToken = account.access_token
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
      // Handle redirect after sign in
      if (url.startsWith("/auth") || url.startsWith("/api")) {
        const finalUrl = `${baseUrl}${url}`
        return finalUrl
      }
      return url.startsWith(baseUrl) ? url : `${baseUrl}/auth/dashboard`
    }
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config)
