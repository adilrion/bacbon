import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Movie } from '@/store/api/moviesApi'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder-movie.svg'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[2/3] relative bg-muted">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.svg'}
          alt={movie.Title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{movie.Year}</span>
          <Badge variant="secondary" className="text-xs">
            {movie.Type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
