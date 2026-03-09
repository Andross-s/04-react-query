import axios from "axios";
import type { Movie } from "../types/movie";

// Raw TMDB API movie object (poster_path/backdrop_path can be null)
interface TmdbMovie {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface TmdbSearchResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const token = import.meta.env.VITE_TMDB_TOKEN;

function mapTmdbMovieToMovie(tmdb: TmdbMovie): Movie {
  return {
    id: tmdb.id,
    poster_path: tmdb.poster_path ?? "",
    backdrop_path: tmdb.backdrop_path ?? "",
    title: tmdb.title,
    overview: tmdb.overview,
    release_date: tmdb.release_date,
    vote_average: tmdb.vote_average,
  };
}

/**
 * Fetches movies from TMDB API by search query
 * @param query - Search term for movies
 * @returns Promise with array of movies
 */

async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<TmdbSearchResponse>(
    `${TMDB_BASE_URL}/search/movie`,
    {
      params: { query },
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data.results.map(mapTmdbMovieToMovie);
}

export { fetchMovies };
