import { useEffect, useRef, useState } from "react";
import Movie from "./Movie";
import Search from "./Search";
import Filtration from "./Filtration";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const searchRef = useRef(null);
  const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7"
    );
    const data = await res.json();
    setMovies(data.results);
    setSearchedMovies(data.results);
  };

  const fetchSearchedMovies = async (newArr) => {
    setSearchedMovies(newArr);
  };

  useEffect(() => {
    searchRef.current.focus();
    fetchMovies();
  }, []);

  if (!movies) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>The best movies in 2025</h1>
      <Search
        ref={searchRef}
        movieObj={movies}
        fetchSearchedMovies={fetchSearchedMovies}
      />
      <Filtration movieObj={movies} fetchSearchedMovies={fetchSearchedMovies}></Filtration>
      <Movie movieObj={searchedMovies} />
    </div>
  );
}
