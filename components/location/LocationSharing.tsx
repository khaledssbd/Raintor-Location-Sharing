"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Send, Users, Wifi, WifiOff } from "lucide-react"
import { useSignalR } from "@/hooks/useSignalR"
import MapView from "./MapView"
import Link from "next/link"

export default function LocationSharing() {
  const [userName, setUserName] = useState("")
  const [lat, setLat] = useState("")
  const [lon, setLon] = useState("")
  const { connection, isConnected, locations, sendLocation } = useSignalR()

  const handleSendLocation = () => {
    if (!userName || !lat || !lon) return

    const latitude = Number.parseFloat(lat)
    const longitude = Number.parseFloat(lon)

    if (isNaN(latitude) || isNaN(longitude)) return

    sendLocation(latitude, longitude, userName)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toString())
          setLon(position.coords.longitude.toString())
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Location Sharing</h1>
            <p className="text-gray-600">Share and track live GPS coordinates using SignalR WebSockets</p>
          </div>
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4 text-green-600" />
              <Badge variant="outline" className="text-green-600 border-green-600">
                Connected
              </Badge>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-600" />
              <Badge variant="outline" className="text-red-600 border-red-600">
                Disconnected
              </Badge>
            </>
          )}
          <span className="text-sm text-gray-500">
            {locations.length} active location{locations.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <Tabs defaultValue="sender" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sender" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Sender
          </TabsTrigger>
          <TabsTrigger value="receiver" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Receiver
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sender">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Send Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="userName">User Name</Label>
                  <Input
                    id="userName"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="e.g., 40.7128"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="e.g., -74.0060"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSendLocation}
                  disabled={!isConnected || !userName || !lat || !lon}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Location
                </Button>
                <Button
                  variant="outline"
                  onClick={getCurrentLocation}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <MapPin className="w-4 h-4" />
                  Use Current Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receiver">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Live Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapView locations={locations} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
