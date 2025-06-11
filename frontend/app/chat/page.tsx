"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function ChatPage() {
  // Hardcoded user for demonstration
  const { user, userLoading } = useFirebase()


  const [messages, setMessages] = useState<any[]>([
    {
      id: "1",
      text: "Welcome to the Bird Watchers Chat!",
      userId: "admin",
      displayName: "Admin",
      photoURL: "/placeholder.svg?height=32&width=32&query=admin",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "2",
      text: "I spotted a rare Painted Bunting today in Central Park!",
      userId: "user456",
      displayName: "Jane Birder",
      photoURL: "/placeholder.svg?height=32&width=32&query=female birder",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: "3",
      text: "That's amazing! Did you get any photos?",
      userId: "user789",
      displayName: "Bird Photographer",
      photoURL: "/placeholder.svg?height=32&width=32&query=photographer",
      timestamp: new Date(Date.now() - 1200000).toISOString(),
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (!user) return (
    <div className="text-center py-10 text-muted-foreground">
      Please
      <a href="/login" className="text-green-600 hover:underline"> sign in </a>
      to chat.</div>)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    try {
      // Create a new message
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: new Date().toISOString(),
      }

      // Add to local state
      setMessages((prev) => [...prev, message])
      setNewMessage("")
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message || "Failed to send message",
        variant: "destructive",
      })
    }
  }


  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Bird Watchers Chat</h1>

        <Card className="h-[70vh] flex flex-col">
          <CardHeader>
            <CardTitle>Community Chat</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.userId === user.uid ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[80%] ${message.userId === user.uid ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-8 w-8 ${message.userId === user.uid ? "ml-2" : "mr-2"}`}>
                    <AvatarImage src={message.photoURL || "/placeholder.svg?height=32&width=32&query=user"} />
                    <AvatarFallback>{message.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg px-4 py-2 ${message.userId === user.uid ? "bg-green-600 text-white" : "bg-gray-100"
                      }`}
                  >
                    <div className="text-xs mb-1">{message.displayName}</div>
                    <div>{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
