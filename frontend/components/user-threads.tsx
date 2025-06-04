"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { getUserThreads } from "@/lib/api/forum"
import { MessageCircle, Edit, Trash2 } from "lucide-react"

interface UserThreadsProps {
  userId: string
}

export default function UserThreads({ userId }: UserThreadsProps) {
  const [threads, setThreads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await getUserThreads(userId)
        setThreads(data)
      } catch (error) {
        console.error("Error fetching user threads:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchThreads()
  }, [userId])

  if (loading) {
    return <div className="text-center py-4">Loading your threads...</div>
  }

  if (threads.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">You haven&apos;t created any forum threads yet.</p>
        <Link href="/forum/new" passHref>
          <Button className="bg-green-600 hover:bg-green-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            Start a Discussion
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {threads.map((thread) => (
        <Card key={thread.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{thread.title}</CardTitle>
              <div className="flex space-x-1">
                <Link href={`/forum/edit/${thread.id}`} passHref>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm line-clamp-2">{thread.preview}</p>
          </CardContent>
          <CardFooter className="pt-0 flex flex-wrap gap-1">
            {thread.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="bg-green-50">
                {tag}
              </Badge>
            ))}
            <div className="ml-auto flex items-center text-xs text-muted-foreground">
              <MessageCircle className="mr-1 h-3 w-3" />
              {thread.replies} {thread.replies === 1 ? "reply" : "replies"}
              <span className="mx-1">•</span>
              {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
