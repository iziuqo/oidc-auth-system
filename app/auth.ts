// app/auth.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/dashboard") return !!auth
      return true
    },
  },
})
