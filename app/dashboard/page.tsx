import { auth } from "../auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Mail, Key, ArrowLeft } from "lucide-react"

export default async function Dashboard() {
  const session = await auth()
  
  if (!session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/bg-abstract.jpg")' }}>
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative p-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link 
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/40 to-blue-800/40 p-8">
              <div className="flex items-center space-x-6">
                {session.user?.image && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                    <Image
                      src={session.user.image}
                      alt={session.user?.name || 'Profile'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{session.user?.name}</h1>
                  <p className="text-white/80">{session.user?.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="p-8">
              <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard 
                  icon={<User className="w-5 h-5" />}
                  title="User ID"
                  value={session.user?.id}
                  description="Unique identifier"
                />
                <InfoCard 
                  icon={<Mail className="w-5 h-5" />}
                  title="Email"
                  value={session.user?.email}
                  description="Your Google email"
                />
              </div>

              {/* Sign Out */}
              <div className="mt-8">
                <Link 
                  href="/auth/signout"
                  className="inline-flex items-center justify-center w-full bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg px-6 py-3 transition duration-200 backdrop-blur-sm"
                >
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, title, value, description }: { 
  icon: React.ReactNode,
  title: string, 
  value?: string | null, 
  description: string 
}) {
  return (
    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10">
      <div className="flex items-center space-x-3 mb-3">
        <div className="text-white/80">{icon}</div>
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      <p className="text-white/90 font-semibold mb-1">{value || "Not available"}</p>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  )
}
