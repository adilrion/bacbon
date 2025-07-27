import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export interface MovieState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    totalResults: number;
    hasSearched: boolean;
}

// Initial state
const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
    searchTerm: "",
    totalResults: 0,
    hasSearched: false,
};

// Async thunk for searching movies
export const searchMovies = createAsyncThunk(
    "movies/searchMovies",
    async (searchTerm: string, { rejectWithValue }) => {
        try {
            // Get API key from environment variables
            const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

            if (!API_KEY) {
                throw new Error(
                    "OMDB API key is not configured. Please add VITE_OMDB_API_KEY to your .env file."
                );
            }

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
                    searchTerm
                )}`
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data: MovieSearchResponse = await response.json();

            if (data.Response === "False") {
                throw new Error(data.Error || "Search failed");
            }

            return {
                movies: data.Search || [],
                totalResults: parseInt(data.totalResults || "0"),
                searchTerm,
            };
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred"
            );
        }
    }
);

// Movie slice
const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        clearSearch: (state) => {
            state.movies = [];
            state.error = null;
            state.searchTerm = "";
            state.totalResults = 0;
            state.hasSearched = false;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.movies;
                state.totalResults = action.payload.totalResults;
                state.searchTerm = action.payload.searchTerm;
                state.hasSearched = true;
                state.error = null;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.movies = [];
                state.totalResults = 0;
                state.hasSearched = true;
            });
    },
});

export const { clearSearch, setSearchTerm } = movieSlice.actions;
export default movieSlice.reducer;
