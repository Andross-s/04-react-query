import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import type { Movie } from "../../types/movie";
import movieService from "../../services/movieService";

function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", search, page],
    queryFn: () => movieService.fetchMovies(search, page),
    enabled: !!search,
    placeholderData: keepPreviousData,
  });

  const handleSearchBar = (query: string) => {
    setSearch(query);
    setPage(1);
    setSelectedMovie(null);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
  };

  const handlePageChange = (event: { selected: number }) => {
    setPage(event.selected + 1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchBar} />
      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}
      {isSuccess && data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleMovieSelect} />
      )}
      {isSuccess && data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      <MovieModal movie={selectedMovie} onClose={handleModalClose} />
    </>
  );
}

export default App;
