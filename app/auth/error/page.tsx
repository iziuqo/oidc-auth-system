export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600">
          There was an error during the authentication process. Please try again or contact support if the problem persists.
        </p>
      </div>
    </div>
  )
}
