// app/auth/signout/page.tsx
import { signOut } from "../../auth"

export default function SignOutPage() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/bg-abstract.jpg")' }}>
      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
                <span className="text-2xl text-white">←</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Sign Out</h1>
              <p className="text-gray-200">Are you sure you want to sign out?</p>
            </div>
            
            <div className="space-y-4">
              <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
                <button className="w-full bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg px-4 py-3 transition duration-200 backdrop-blur-sm">
                  Yes, Sign Out
                </button>
              </form>
              
              <a 
                href="/dashboard" 
                className="block w-full bg-white/10 hover:bg-white/20 text-white text-center rounded-lg px-4 py-3 transition duration-200"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
