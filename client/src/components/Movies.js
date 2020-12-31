import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './MovieList';
import MovieForm from './MovieForm';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [movieFormVisibility, setMovieFormVisibility] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [renderMovies, setRenderMovies] = useState(true);

  useEffect(() => {
    if (renderMovies) {
      fetchMovies();
      console.log(selectedMovieId);
      setRenderMovies(false);
    }
  }, [renderMovies]);

  const fetchMovies = async () => {
    const response = await axios.get('http://localhost:8080/movies/all', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = response.data.data;
    setMovies(result);
  };

  function handleMovieFormVisibilityChange() {
    setMovieFormVisibility(false);
    setRenderMovies(true);
  }
  function handleSelectedMovieChange(movieId) {
    setSelectedMovieId(movieId);
    setMovieFormVisibility(true);
    console.log('Movie ID Selected', movieId);
  }

  if (movies.length <= 0) {
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>IMDB Clone</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            setMovieFormVisibility(true);
          }}
          disabled={movieFormVisibility}
        >
          + Add New Movie
        </button>
        <MovieForm
          visibility={movieFormVisibility}
          changeVisibility={handleMovieFormVisibilityChange}
          movieId={selectedMovieId}
        />
      </div>
    );
  } else
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>IMDB Clone</h3>
        <MovieList
          movies={movies}
          selectedMovieId={handleSelectedMovieChange}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setMovieFormVisibility(true);
          }}
          disabled={movieFormVisibility}
        >
          + Add New Movie
        </button>
        <MovieForm
          visibility={movieFormVisibility}
          changeVisibility={handleMovieFormVisibilityChange}
          movieId={selectedMovieId}
        />
      </div>
    );
}

export default Movies;
