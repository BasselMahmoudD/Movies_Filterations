import "../styles/style.css";
import { useState } from "react";

export default function Movie({ movieObj }) {
  const [qtyMap, setQtyMap] = useState({});

  const incrCardQty = (id) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrCardQty = (id) => {
    setQtyMap((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <div className="movie-container">
      {movieObj.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-year">Year: {movie.release_date}</p>
          <p className="movie-rating">Rating: {movie.vote_average}</p>

          <div className="qty-controls">
            <span>QTY: {qtyMap[movie.id] || 1}</span>
            <button onClick={() => incrCardQty(movie.id)}>+</button>
            <button onClick={() => decrCardQty(movie.id)}>-</button>
          </div>
        </div>
      ))}
    </div>
  );
}
