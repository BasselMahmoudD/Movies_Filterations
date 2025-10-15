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
  
  const fetchSearchedMovies = (newArr) => {
    setSearchedMovies(applyFilters(newArr, filters));
  };
  
  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    setSearchedMovies(applyFilters(movies, newFilters));
  };
  
  useEffect(() => {
    fetchMovies();
  }, []);
  
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [movies]);
  
  if (!movies.length) return <h1>Loading...</h1>;

  return (
  <div className="main-container"> <div className="content">
  <h1>THE BEST MOVIES</h1>
      <Search
        ref={searchRef}
        movieObj={movies}
        fetchSearchedMovies={fetchSearchedMovies}
      />
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
