import { MovieGrid } from '@/components/MovieGrid'
import type { MovieSearchResponse } from '@/store/api/moviesApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearSearch, searchMovies } from '@/store/slices/movieSlice'
import { useCallback } from 'react'
import './App.css'
import { MovieSearch } from './components/MovieSearch'

function App() {
  const dispatch = useAppDispatch()
  const { movies, loading, error, hasSearched, searchTerm } = useAppSelector(
    (state) => state.movies
  )
  console.log("🚀 ~ movies:", movies)

  const handleSearchResults = useCallback((data: MovieSearchResponse | null) => {
    if (!data) {
      dispatch(clearSearch())
    }
  }, [dispatch])

 
  const handleSearchTerm = useCallback((term: string) => {
    if (term.trim()) {
      dispatch(searchMovies(term.trim()))
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Movie Search</h1>
          <p className="text-muted-foreground">
            Discover movies using the OMDB API
          </p>
        </div>

        <MovieSearch
          onSearchResults={handleSearchResults}
          // onLoading={hasSearched ? handleLoading : undefined}
          // onError={handleError}
          onSearchTerm={handleSearchTerm}
        />
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  )
}

export default App
