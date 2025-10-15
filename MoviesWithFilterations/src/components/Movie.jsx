import "../styles/style.css";

export default function Movie({ movieObj }) {
  return (
    <div className="movie-container">
      {movieObj.map((movie) => (
        <div key={movie.title} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-year">Year: {movie.release_date}</p>
          <p className="movie-rating">Rating: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
}
