import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Raintor Frontend | Real-time Location & User Feed',
  description:
    'Production-quality Next.js frontend with real-time location sharing using SignalR and infinite scrolling user feed',
  keywords: [
    'Next.js',
    'SignalR',
    'Real-time',
    'Location Sharing',
    'Infinite Scroll',
    'TypeScript',
  ],
  authors: [{ name: 'Raintor Frontend Team' }],
  generator: 'raintor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          //   richColors
          //   position="top-center"
          toastOptions={{
            style: {
              background: '#2ecc71',
              border: 'none',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
