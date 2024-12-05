// app/auth/login/page.tsx
import { auth, signIn } from "../../auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()
  
  // Redirect to dashboard if already logged in
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/bg-abstract.jpg")' }}>
      {/* Overlay with blur effect */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
              <p className="text-gray-200">Sign in with your preferred provider</p>
            </div>

            <div className="space-y-4">
              {/* Google */}
              <form action={async () => {
                'use server'
                await signIn('google', { redirectTo: '/dashboard' })
              }}>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-800 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition duration-200">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </form>

              {/* GitHub */}
              <form action={async () => {
                'use server'
                await signIn('github', { redirectTo: '/dashboard' })
              }}>
                <button className="w-full bg-[#24292F] hover:bg-[#2D333B] text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Continue with GitHub</span>
                </button>
              </form>

              {/* Azure AD */}
              <form action={async () => {
                'use server'
                await signIn('azure-ad', { redirectTo: '/dashboard' })
              }}>
                <button className="w-full bg-[#05a6f0] hover:bg-[#0498da] text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1h10v10H1V1zm11 0h10v10H12V1zM1 12h10v10H1V12zm11 0h10v10H12V12z"/>
                  </svg>
                  <span>Continue with Microsoft</span>
                </button>
              </form>

              {/* Auth0 */}
              <form action={async () => {
                'use server'
                await signIn('auth0', { redirectTo: '/dashboard' })
              }}>
                <button className="w-full bg-[#635dff] hover:bg-[#5851db] text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-2 transition duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12 24l6.166-4.537c3.784-2.81 5.167-7.703 3.814-12.015zM12 6.635A2.635 2.635 0 1 1 12 1.365a2.635 2.635 0 0 1 0 5.27z"/>
                  </svg>
                  <span>Continue with Auth0</span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/60">Protected by OIDC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
