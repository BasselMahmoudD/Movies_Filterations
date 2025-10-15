import { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import Search from "./Search";
import Filter from "./Filter";
import "../styles/style.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [filters, setFilters] = useState({ year: "", rating: "" });
  const searchRef = useRef(null);

  const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7"
    );
    const data = await res.json();
    setMovies(data.results);
    setSearchedMovies(data.results);
  };

  // Apply filters (by year & rating)
  const applyFilters = (arr, filters) => {
    return arr.filter((movie) => {
      const yearMatch = filters.year
        ? movie.release_date?.startsWith(filters.year)
        : true;
      const ratingMatch = filters.rating
        ? movie.vote_average >= parseFloat(filters.rating)
        : true;
      return yearMatch && ratingMatch;
    });
  };

  // When user types in search box
  const fetchSearchedMovies = (newArr) => {
    setSearchedMovies(applyFilters(newArr, filters));
  };

  // When user updates filter input
  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    setSearchedMovies(applyFilters(movies, newFilters));
  };

  // Fetch movies once
  useEffect(() => {
    fetchMovies();
  }, []);

  // Focus search input after movies load
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [movies]);

  if (!movies.length) return <h1>Loading...</h1>;

  return (
  <div className="main-container">
    <h1>The best movies in 2025</h1>

    <Search
      ref={searchRef}
      movieObj={movies}
      fetchSearchedMovies={fetchSearchedMovies}
    />

    <div className="content">
      <aside className="sidebar">
        <Filter onFilterChange={handleFilterChange} />
      </aside>

      <main className="main-content">
        <Movie movieObj={searchedMovies} />
      </main>
    </div>
  </div>
);

}
