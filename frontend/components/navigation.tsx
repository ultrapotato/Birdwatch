"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "firebase/auth"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, User, LogOut, Settings, Search, MessageCircle, Bell, LogIn } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { auth } from "@/lib/firebase/firebase"
import { useRouter } from "next/navigation"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function Navigation() {
  // Hardcoded user for demonstration
  // const  = useState({
  //   uid: "user123",
  //   email: "user@example.com",
  //   displayName: "Bird Enthusiast",
  //   photoURL: "/placeholder.svg?height=40&width=40&query=user profile",
  // })
  const { user, userLoading } = useFirebase()

  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()
  const { toast } = useToast()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast({
        title: "Signed out",
        description: "You have been successfully logged out.",
      })
      router.push("/")
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }


  const navItems = [
    user ? { name: "Dashboard", href: "/dashboard" } : { name: "Home", href: "/" },
    { name: "Birds", href: "/birds" },
    { name: "Search", href: "/search", icon: <Search className="h-4 w-4 mr-2" /> },
    { name: "Forum", href: "/forum", icon: <MessageCircle className="h-4 w-4 mr-2" /> },
    { name: "Chat", href: "/chat" },
    { name: "Articles", href: "/articles" },
  ]

  const authItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Alerts", href: "/alerts", icon: <Bell className="h-4 w-4 mr-2" /> },
    { name: "Profile", href: "/profile", icon: <User className="h-4 w-4 mr-2" /> },
    { name: "Settings", href: "/settings", icon: <Settings className="h-4 w-4 mr-2" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

      <div className="flex h-16 items-center">

        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-green-600"
            >
              <path d="M16 8v8M8 8v8M12 4v16M22 9a2 2 0 0 0-2-2h-1a4 4 0 0 0-4 4v2a4 4 0 0 0 4 4h1a2 2 0 0 0 2-2M2 9a2 2 0 0 1 2-2h1a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4H4a2 2 0 0 1-2-2" />
            </svg>
            <span className="font-bold text-xl">BirdWatch</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="ml-auto">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm ${pathname === item.href
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                      } rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && item.icon}
                    {item.name}
                  </Link>
                ))}
                <div className="border-t my-2"></div>
                {authItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm ${pathname === item.href
                      ? "bg-green-50 text-green-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                      } rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && item.icon}
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsOpen(false)
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-green-600" : "text-muted-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center space-x-4">
              {loading ? (
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user?.photoURL || "/placeholder.svg?height=32&width=32&query=user"}
                          alt={user?.displayName || "User"}
                        />
                        <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>



                    {
                      !user ?
                        <div className="inline-flex items-center">
                          <LogIn className="mr-2 h-4 w-4" />
                          <a href="/login" className="text-green-600 hover:underline">
                            <span>Sign In</span>
                          </a>
                        </div>
                        :

                        <div>
                          <div className="flex flex-col space-y-1 p-2">
                            <p className="text-sm font-medium">{user?.displayName}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                          </div>
                          <DropdownMenuSeparator />
                          {authItems.map((item) => (
                            <Link key={item.name} href={item.href} passHref>
                              <DropdownMenuItem className="cursor-pointer">
                                {item.icon && item.icon}
                                {item.name}
                              </DropdownMenuItem>
                            </Link>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </DropdownMenuItem>
                        </div>
                    }

                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </>
        )}

      </div>
    </header>
  )
}
