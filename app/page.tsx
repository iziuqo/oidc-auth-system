import { auth, signIn, signOut } from "./auth"
import Link from "next/link"

export default async function Home() {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8">Welcome to OIDC Auth System</h1>
                {session ? (
                  <div className="space-y-4">
                    <p>Signed in as {session.user?.email}</p>
                    <Link 
                      href="/dashboard"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Go to Dashboard
                    </Link>
                    <form action={async () => { 'use server'; await signOut() }}>
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Sign Out
                      </button>
                    </form>
                  </div>
                ) : (
                  <form action={async () => { 'use server'; await signIn('google') }}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Sign In with Google
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}