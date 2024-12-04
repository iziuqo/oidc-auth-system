// app/auth/signout/page.tsx
import { signOut } from "../../auth"

export default function SignOutPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign Out</h1>
        <p className="text-gray-600 mb-6">Are you sure you want to sign out?</p>
        
        <div className="space-x-4">
          <form className="inline-block" action={async () => { 'use server'; await signOut({ redirectTo: '/' }) }}>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
              Yes, Sign Out
            </button>
          </form>
          
          <a 
            href="/dashboard" 
            className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  )
}
