import type { Metadata } from "next"
import UserFeed from "@/components/users/UserFeed"

export const metadata: Metadata = {
  title: "User Feed | Raintor",
  description: "Browse users with infinite scrolling and optimized performance",
}

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserFeed />
    </div>
  )
}
