import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"

interface BirdListItemProps {
  bird: any
}

export default function BirdListItem({ bird }: BirdListItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48 sm:h-auto">
            <img
              src={bird.imageUrl || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(bird.species)}`}
              alt={bird.species}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-4 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <Link href={`/birds/${bird.id}`} className="hover:underline">
                <h3 className="font-bold text-lg">{bird.species}</h3>
              </Link>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formatDistanceToNow(new Date(bird.createdAt), { addSuffix: true })}
              </div>
            </div>

            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {bird.location}
            </div>

            <p className="mt-2 text-sm line-clamp-2">{bird.description}</p>

            <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {bird.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-green-50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={`/placeholder.svg?height=24&width=24&query=${bird.userName}`} />
                  <AvatarFallback>{bird.userName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="text-xs">{bird.userName}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
