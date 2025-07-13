import type { Metadata } from "next"
import LocationSharing from "@/components/location/LocationSharing"

export const metadata: Metadata = {
  title: "Real-Time Location Sharing | Raintor",
  description: "Share and track live GPS coordinates using SignalR WebSockets",
}

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LocationSharing />
    </div>
  )
}
