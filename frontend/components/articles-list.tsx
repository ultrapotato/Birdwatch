"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { getArticles } from "@/lib/api/articles"

export default function ArticlesList({searchQuery = ""}) {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles()
        setArticles(data)
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-40 bg-gray-200 animate-pulse" />
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

    const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) || 
    article.author.toLowerCase().includes(searchQuery.toLowerCase()),)



  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {filteredArticles.map((article) => (
        <Link href={`/articles/${article.id}`} key={article.id} passHref>
          <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
            <div className="relative h-40 overflow-hidden">
              <img
                src={
                  article.imageUrl || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(article.title)}`
                }
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 flex-1">
              <h3 className="font-bold text-lg mb-1">{article.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {article.author} • {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
              </p>
              <p className="text-sm line-clamp-3">{article.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="outline" className="bg-green-50">
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
