import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { MovieSearchResponse } from '@/store/api/moviesApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearSearch, searchMovies } from '@/store/slices/movieSlice'
import { Search, X } from 'lucide-react'
import { useCallback, useState } from 'react'

interface MovieSearchProps {
  onSearchResults?: (data: MovieSearchResponse | null) => void;
  onLoading?: () => void;
  onError?: () => void;
  onSearchTerm?: (term: string) => void;
}

export function MovieSearch({ onSearchResults, onLoading, onError, onSearchTerm }: MovieSearchProps) {
  const dispatch = useAppDispatch()
  const { loading, searchTerm: currentSearchTerm } = useAppSelector((state) => state.movies)
  const [inputValue, setInputValue] = useState('')

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const term = inputValue.trim()
      onSearchTerm?.(term)
      onLoading?.()

      try {
        await dispatch(searchMovies(term)).unwrap()
        onSearchResults?.(null) // Redux handles the results now
      } catch {
        onError?.()
      }
    }
  }, [inputValue, dispatch, onSearchTerm, onLoading, onSearchResults, onError])

  const handleClear = useCallback(() => {
    setInputValue('')
    dispatch(clearSearch())
    onSearchResults?.(null)
    onError?.()
    onSearchTerm?.('')
  }, [dispatch, onSearchResults, onError, onSearchTerm])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for movies..."
            value={inputValue}
            onChange={handleInputChange}
            className="pr-10"
            disabled={loading}
          />
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button type="submit" disabled={loading || !inputValue.trim()}>
          {loading ? (
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>

      {currentSearchTerm && (
        <div className="mt-4 text-sm text-muted-foreground">
          Results for: "{currentSearchTerm}"
        </div>
      )}
    </div>
  )
}
