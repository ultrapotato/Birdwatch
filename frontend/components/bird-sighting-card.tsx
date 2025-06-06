import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { BirdSighting } from "@/lib/models/bird.models"

interface BirdCardProps {
  bird: BirdSighting
}

export function BirdSightingCard({ bird }: BirdCardProps) {
  return (
    <Link href={`/birds/${bird.id}`} passHref>
      <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={bird.images[0]?.url || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(bird.speciesName)}`}
            alt={bird.speciesName}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-bold text-lg mb-1">{bird.speciesName}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {bird.location} • {formatDistanceToNow(new Date(bird.createdAt), { addSuffix: true })}
          </p>
          <p className="text-sm line-clamp-3">{bird.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
          {bird.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-green-50">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}
