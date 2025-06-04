import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FirebaseProvider } from "@/lib/firebase/firebase-provider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BirdWatch - Bird Sighting Platform",
  description: "Report and discover bird sightings in your area",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <FirebaseProvider>
            <div className="w-full mx-auto">

              <div className="flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-1">
                  {children}
                </main>
                <footer className="border-t py-6 md:py-8">
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                      &copy; {new Date().getFullYear()} BirdWatch. All rights reserved.
                    </p>
                  </div>
                </footer>
              </div>
            </div>
            <Toaster />
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
