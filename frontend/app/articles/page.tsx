"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { getArticles } from "@/lib/frontend-api/articles"
import { BookOpen } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import ArticlesList from "@/components/articles-list"
import { Article } from "@/lib/models/article.models"

export default function ArticlesPage() {
  const { user, userLoading } = useFirebase()

  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // const userArticles = await getUserArticles(user.uid)
        // setUserArticles(userArticles)
        const articles = await getArticles()
        setArticles(articles)
        // setArticles(articles)
      } catch (error) {
        console.error("Error fetching alerts:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchUserArticles = async () => { }

    fetchArticles()
    if (!user) return
    fetchUserArticles()
  }, [user])

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Collected Articles</h1>
          <BookOpen className="h-6 w-6 text-green-600" />
        </div>
        <p>Read articles pertaining to birds or what not...</p>

        <Tabs defaultValue="newArticles" className="space-y-6">
          <div className="flex">
            <TabsList>
              <TabsTrigger value="newArticles">New Articles</TabsTrigger>
              <TabsTrigger value="myBirdArticles">My Curated Articles</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-2 ml-auto">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
          </div>

          <TabsContent value="newArticles" className="space-y-4">
            {
              loading ? (
                <div className="text-center py-4">Loading your articles... </div>
              ) : (
                <ArticlesList searchQuery={searchQuery} />
              )
            }
          </TabsContent>

          <TabsContent value="myBirdArticles" className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading your articles... {articles.length}</div>
            ) : !user ? (
              <div className="text-center py-10 text-muted-foreground">
                Please{" "}
                <a href="/login" className="text-green-600 hover:underline">
                  sign in
                </a>{" "}
                to cherry pick articles.
              </div>
            ) : (
              <div className="space y-4">I'm signed in</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
