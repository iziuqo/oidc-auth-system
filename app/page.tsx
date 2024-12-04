// app/page.tsx
import { auth, signIn, signOut } from "./auth"
import Link from "next/link"
import { Google } from "lucide-react"

export default async function Home() {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/bg-abstract.jpg")' }}>
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
              <p className="text-gray-200">Sign in to access your dashboard</p>
            </div>

            {session ? (
              <div className="space-y-4">
                <p className="text-white/90 text-center">
                  Signed in as {session.user?.email}
                </p>
                <Link 
                  href="/dashboard"
                  className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-4 py-3 text-center font-medium transition duration-200 backdrop-blur-sm"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  href="/auth/signout"
                  className="block w-full bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg px-4 py-3 text-center transition duration-200 backdrop-blur-sm"
                >
                  Sign Out
                </Link>
              </div>
            ) : (
              <form action={async () => { 'use server'; await signIn('google') }}>
                <button className="w-full bg-white/90 hover:bg-white text-gray-800 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition duration-200">
                  <Google className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
