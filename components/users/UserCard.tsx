"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, GraduationCap, Building } from "lucide-react"
import type { User } from "@/types/user"
import Image from "next/image"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Image
              src={user.avatar || "/placeholder.svg?height=48&width=48"}
              alt={`${user.username}'s avatar`}
              width={48}
              height={48}
              className="rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=48&width=48"
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{user.username}</h3>
            <p className="text-sm text-gray-600 truncate">{user.company.title}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 truncate" title={user.email}>
              {user.email}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600">{user.phone}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 truncate" title={user.university}>
              {user.university}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Building className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 truncate" title={user.company.name}>
              {user.company.name}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Badge variant="secondary" className="text-xs">
            ID: {user.id}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
