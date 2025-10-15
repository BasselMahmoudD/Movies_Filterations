
export default function Filtration({ movieObj , fetchSearchedMovies }) {
  let handleChange = (e) => {
    let filtered = movieObj.filter((movie) => movie.release_date.split("-")[0] == e.target.innerHTML)
    fetchSearchedMovies(filtered)
  }
  return (
    <div>
      <button onClick={handleChange}>2025</button>
      <button onClick={handleChange}>2024</button>
      <button onClick={handleChange}>2023</button>
    </div>
  )
}
