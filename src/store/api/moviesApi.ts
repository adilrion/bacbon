import { baseApi } from "./baseApi";

// Types
export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface MovieSearchResponse {
    Search?: Movie[];
    totalResults?: string;
    Response: string;
    Error?: string;
}

export interface MovieDetailResponse {
    imdbID: string;
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Error?: string;
}

const moviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        searchMovies: build.query<
            MovieSearchResponse,
            { searchTerm: string; page?: number }
        >({
            query: ({ searchTerm, page = 1 }) => {
                const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

                if (!API_KEY) {
                    throw new Error(
                        "OMDB API key is not configured. Please add VITE_OMDB_API_KEY to your .env file."
                    );
                }

                return {
                    url: "",
                    method: "GET",
                    params: {
                        apikey: API_KEY,
                        s: searchTerm, // Use 's' for search, 't' for title lookup
                        page: page.toString(),
                    },
                };
            },
            providesTags: ["Movie"],
        }),

        getMovieById: build.query<MovieDetailResponse, string>({
            query: (imdbID: string) => {
                const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

                if (!API_KEY) {
                    throw new Error(
                        "OMDB API key is not configured. Please add VITE_OMDB_API_KEY to your .env file."
                    );
                }

                return {
                    url: "",
                    method: "GET",
                    params: {
                        apikey: API_KEY,
                        i: imdbID,
                    },
                };
            },
            providesTags: ["Movie"],
        }),

        searchMovieByTitle: build.query<MovieDetailResponse, string>({
            query: (title: string) => {
                const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

                if (!API_KEY) {
                    throw new Error(
                        "OMDB API key is not configured. Please add VITE_OMDB_API_KEY to your .env file."
                    );
                }

                return {
                    url: "",
                    method: "GET",
                    params: {
                        apikey: API_KEY,
                        t: title,
                    },
                };
            },
            providesTags: ["Movie"],
        }),
    }),
});

export const {
    useSearchMoviesQuery,
    useGetMovieByIdQuery,
    useSearchMovieByTitleQuery,
    useLazySearchMoviesQuery,
    useLazyGetMovieByIdQuery,
    useLazySearchMovieByTitleQuery,
} = moviesApi;
