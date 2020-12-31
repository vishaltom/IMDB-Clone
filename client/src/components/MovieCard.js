import React from 'react';
import poster from '../images/MoviePoster1.jpg';

function MovieCard({ movie, selectedMovieChange }) {
  const actorList = movie.Actors.map((actor) => {
    return actor['Name'];
  });
  const actorListString = actorList.join(', ');

  function handleSelectedMovie() {
    selectedMovieChange(movie._id);
  }
  return (
    <div className="card mb-3" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={poster}
            alt="Movie Poster"
            width="100%"
            style={{ height: '296px' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{movie.Name}</h5>
            <button
              className="btn btn-sm btn-light"
              onClick={handleSelectedMovie}
              style={{ float: 'right' }}
            >
              {' '}
              - Edit
            </button>
            <p className="card-text">
              <small className="text-muted">
                Year Of Release : {movie.YearOfRelease}
              </small>
            </p>
            <p className="card-text">Plot : {movie.Plot}</p>
            <p className="card-text">Producer : {movie.Producer.Name}</p>
            <p className="card-text">Actors : {actorListString}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
