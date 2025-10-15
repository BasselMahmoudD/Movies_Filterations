import React, { forwardRef } from "react";

const Search = forwardRef(({ movieObj, fetchSearchedMovies }, ref) => {
  const handleChange = (e) => {
    const str = e.target.value;
    const searched = movieObj.filter((movie) =>
      movie.title.toLowerCase().includes(str.toLowerCase())
    );
    fetchSearchedMovies(searched);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        name="search"
        ref={ref}
        className="search-input"
        placeholder="Search for a movie..."
        onChange={handleChange}
      />
    </div>
  );
});

export default Search;
