import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Raintor Frontend
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time location sharing and infinite scrolling user feed built
            with Next.js 15, SignalR, and modern React patterns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-blue-600" />
                <div>
                  <CardTitle>Real-Time Location Sharing</CardTitle>
                  <CardDescription>
                    Share and track live GPS coordinates using SignalR
                    WebSockets
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="w-4 h-4" />
                  <span>Real-time WebSocket communication</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>Interactive map with live updates</span>
                </div>
                <Link href="/location">
                  <Button className="w-full mt-4">Try Location Sharing</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-green-600" />
                <div>
                  <CardTitle>Infinite Scroll User Feed</CardTitle>
                  <CardDescription>
                    Browse users with optimized infinite scrolling and
                    virtualization
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="w-4 h-4" />
                  <span>Intersection Observer API</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>Virtualized list performance</span>
                </div>
                <Link href="/users">
                  <Button
                    className="w-full mt-4 bg-transparent"
                    variant="outline"
                  >
                    Browse Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            Built with Next.js 15, TypeScript, Tailwind CSS, and SignalR
          </p>
        </div>
      </div>
    </div>
  );
}
