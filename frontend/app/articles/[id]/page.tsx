"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getArticleById } from "@/lib/frontend-api/articles"
import { Article } from "@/lib/models/article.models"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import Markdown from 'react-markdown'

export default function ArticleDetailPage() {
  const { id } = useParams() as { id: string }
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const fetchedArticle = await getArticleById(id)
        setArticle(fetchedArticle)
      } catch (err) {
        console.error("Error fetching article:", err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-8 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container py-10 text-center text-muted-foreground">
        <p className="text-xl">😢 Article not found.</p>
        <p className="mt-2">
          Try going back to the{" "}
          <a href="/articles" className="text-green-600 underline hover:no-underline">
            articles page
          </a>
          .
        </p>
      </div>
    )
  }


  return (
    <div className="container py-10 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <div className="text-sm text-muted-foreground mt-1">
          By {article.authorName} · {format(new Date(article.publishedAt), "PPP")}
        </div>
      </div>

      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="rounded-lg mb-6 max-h-96 w-full object-cover"
        />
      )}

      <article className="prose dark:prose-invert">
        <Markdown>{article.content}</Markdown>
      </article>

      <div className="mt-10 text-sm text-muted-foreground">
        Tags: {article.tags.join(", ")}
      </div>
    </div>
  )
}
