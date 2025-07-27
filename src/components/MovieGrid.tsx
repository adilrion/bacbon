import type { Movie } from '@/store/api/moviesApi';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
  searchTerm: string;
}

export function MovieGrid({ movies, loading, error, hasSearched, searchTerm }: MovieGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4" />
        <p className="text-muted-foreground">Searching movies...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-destructive text-lg mb-2">⚠️ Error</div>
        <p className="text-muted-foreground text-center">{error}</p>
      </div>
    )
  }

  if (hasSearched && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-semibold mb-2">No movies found</h3>
        <p className="text-muted-foreground text-center">
          {searchTerm ? `No results found for "${searchTerm}"` : 'Try searching for a different movie title'}
        </p>
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🍿</div>
        <h3 className="text-xl font-semibold mb-2">Welcome to Movie Search</h3>
        <p className="text-muted-foreground text-center">
          Search for your favorite movies using the search bar above
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Found {movies.length} results
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  )
}
