"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, MessageCircle, User, Calendar } from "lucide-react"
import { getForumThreads } from "@/lib/frontend-api/forum"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface Post {
  id: string;
  title: string;
  preview: string;
  author: string;
  tags: string[];
  replies: number;
  createdAt: string;
}


export default function ForumPage() {
  const [threads, setThreads] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const data = await getForumThreads()
        setThreads(data)
      } catch (error) {
        console.error("Error fetching threads:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchThreads()
  }, [])

  const filteredThreads = threads.filter(
    (thread: any) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Bird Forum</h1>
            <Link href="/forum/new" passHref>
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Thread
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">Ask questions and discuss birds with fellow enthusiasts.</p>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center py-8">Loading threads...</div>
        ) : filteredThreads.length > 0 ? (
          <div className="space-y-4">
            {filteredThreads.map((thread: any) => (
              <Link href={`/forum/${thread.id}`} key={thread.id} passHref>
                <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{thread.title}</CardTitle>
                      <div className="flex space-x-1">
                        {thread.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="bg-green-50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardDescription>
                      {thread.preview.substring(0, 150)}
                      {thread.preview.length > 150 ? "..." : ""}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {thread.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="mr-1 h-3 w-3" />
                        {thread.replies} {thread.replies === 1 ? "reply" : "replies"}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {searchQuery ? "No threads found matching your search." : "No threads have been created yet."}
          </div>
        )}
      </div>
    </div>
  )
}
