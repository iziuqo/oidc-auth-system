// app/dashboard/page.tsx
import { auth } from "../auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default async function Dashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with profile image */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex items-center space-x-4">
              {session.user?.image && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={session.user.image}
                    alt={session.user?.name || 'Profile'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-white">
                <h1 className="text-2xl font-bold">{session.user?.name}</h1>
                <p className="opacity-90">{session.user?.email}</p>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <InfoCard 
                title="User ID" 
                value={session.user?.id} 
                description="Unique identifier provided by Google"
              />
              <InfoCard 
                title="Email" 
                value={session.user?.email} 
                description="Your Google email address"
              />
              <InfoCard 
                title="Name" 
                value={session.user?.name}
                description="Your full name"
              />
            </div>

            {/* Technical Details Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Debug Information</h2>
              <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            </div>

            {/* Sign Out Link */}
            <div className="mt-6">
              <Link 
                href="/auth/signout"
                className="block w-full bg-red-500 text-white text-center px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, value, description }: { title: string, value?: string | null, description: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-700">{title}</h3>
      <p className="text-gray-900 font-semibold mt-1">{value || "Not available"}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  )
}
