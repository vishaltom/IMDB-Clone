import React from 'react';
import MovieCard from './MovieCard';
import '../App.css';

function MovieList({ movies, selectedMovieId }) {
  function selectedMovieIdChange(movieId) {
    selectedMovieId(movieId);
  }
  const movieCards = movies.map((movie) => {
    return (
      <MovieCard
        movie={movie}
        key={movie._id}
        selectedMovieChange={selectedMovieIdChange}
      />
    );
  });
  return <div className="movie-list">{movieCards}</div>;
}

export default MovieList;
