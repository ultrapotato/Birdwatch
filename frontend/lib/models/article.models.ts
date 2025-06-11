export interface Article {
  id?: string // Firestore document ID
  title: string
  excerpt: string
  content: string // Markdown or HTML
  authorId: string
  authorName: string
  authorAvatar?: string
  imageUrl?: string
  tags: string[]
  publishedAt:  string // ISO string
  createdAt:  string
  updatedAt?: string
  isFeatured?: boolean
}
