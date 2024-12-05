import Link from 'next/link'

export default function AuthError({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const getErrorMessage = (error: string | undefined) => {
    switch (error) {
      case 'Configuration':
        return 'There was an error with the server configuration. This might be due to missing environment variables.';
      case 'AccessDenied':
        return 'Access was denied. You may need to be added to the allowed users list.';
      case 'Verification':
        return 'The verification token was invalid or has expired.';
      case 'OAuthSignin':
        return 'Error in constructing the authorization URL.';
      case 'OAuthCallback':
        return 'Error in handling the OAuth callback.';
      case 'OAuthCreateAccount':
        return 'Error creating OAuth account.';
      case 'EmailCreateAccount':
        return 'Could not create email account.';
      case 'Callback':
        return 'Error in the OAuth callback handler.';
      case 'InvalidCredentials':
        return 'Invalid credentials provided.';
      default:
        return 'An unexpected authentication error occurred.';
    }
  }

  console.log('Auth Error:', searchParams?.error); // Debug log

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url("/bg-abstract.png")' }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
                <span className="text-2xl text-white">!</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Authentication Error</h1>
              <p className="text-gray-200 mb-6">
                {getErrorMessage(searchParams?.error)}
              </p>
              
              <p className="text-sm text-gray-300">
                Error Code: {searchParams?.error || 'Unknown'}
              </p>
            </div>
            
            <div className="space-y-4">
              <Link 
                href="/auth/login"
                className="block w-full bg-blue-500/80 hover:bg-blue-600/80 text-white text-center rounded-lg px-4 py-3 transition duration-200"
              >
                Try Again
              </Link>
              <Link 
                href="/"
                className="block w-full bg-white/10 hover:bg-white/20 text-white text-center rounded-lg px-4 py-3 transition duration-200"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
