import { auth } from "../auth"

export default async function Dashboard() {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="space-y-4">
          <p>Welcome, {session?.user?.name}!</p>
          <p>Email: {session?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}