import React, { useState, useEffect } from 'react';
import ActorDropdown from './ActorDropdown';
import ProducerDropdown from './ProducerDropdown';
import axios from 'axios';
import ProducerForm from './ProducerForm';
import ActorForm from './ActorForm';

function MovieForm({ visibility, changeVisibility, movieId }) {
  const [editMode, setEditMode] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [yearOfRelease, setYearOfRelease] = useState('');
  const [plot, setPlot] = useState('');
  const [producer, setProducer] = useState('');
  const [producerList, setProducerList] = useState([]);
  const [producerFormVisibility, setProducerFormVisibility] = useState(false);
  const [renderProducerDropdown, setRenderProducerDropdown] = useState(true);
  const [actors, setActors] = useState([]);
  const [actorList, setActorList] = useState([]);
  const [actorformVisibility, setActorFormVisibility] = useState(false);
  const [renderActorDropdown, setRenderActorDropdown] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    if (movieId) {
      console.log(movieId);
      setEditMode(true);
      fetchMovieForId();
    }
    if (renderProducerDropdown) {
      fetchProducerOptions();
      setRenderProducerDropdown(false);
    }
    if (renderActorDropdown) {
      fetchActorOptions();
      setRenderActorDropdown(false);
    }
  }, [movieId, renderProducerDropdown, renderActorDropdown]);

  const fetchMovieForId = async () => {
    const response = await axios.get(
      `http://localhost:8080/movies/id=${movieId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const result = response.data.data;
    setMovieIdData(result);
  };

  function setMovieIdData(movie) {
    setMovieName(movie[0].Name);
    setYearOfRelease(movie[0].YearOfRelease);
    setPlot(movie[0].Plot);
    setProducer(movie[0].Producer);
    setActors(movie[0].Actors);
  }
  function handleMovieNameChange(event) {
    setMovieName(event.target.value);
  }
  function handleYearOfReleaseChange(event) {
    setYearOfRelease(event.target.value);
  }
  function handlePlotChange(event) {
    setPlot(event.target.value);
  }
  function handleProducerChange(producerId) {
    setProducer(producerId);
  }
  function handleActorChange(idList) {
    setActors(idList);
  }
  function handleActorFormVisibilityChange() {
    setActorFormVisibility(false);
    setRenderActorDropdown(true);
  }
  function handleProducerFormVisibilityChange() {
    setProducerFormVisibility(false);
    setRenderProducerDropdown(true);
  }

  const fetchProducerOptions = async () => {
    const response = await axios.get(
      'http://localhost:8080/producers/producerDropdown',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    setProducerList(response.data.data);
  };

  const fetchActorOptions = async () => {
    const response = await axios.get(
      'http://localhost:8080/actors/actorDropdown',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    setActorList(response.data.data);
  };
  function handleReset() {
    setMovieName('');
    setYearOfRelease('');
    setPlot('');
    setProducer('');
    setActors([]);
    setEditMode(false);
    changeVisibility();
    setErrorStatus(false);
    setErrorMessage('');
    setActorFormVisibility(false);
    setProducerFormVisibility(false);
  }
  const updateMovieData = async () => {
    const response = await axios.post(
      `http://localhost:8080/movies/id=${movieId}`,
      {
        Name: movieName,
        YearOfRelease: yearOfRelease,
        Plot: plot,
        Producer: producer,
        Actors: actors,
      }
    );
    console.log(response);
    if (response.data.success) {
      handleReset();
    }
  };
  const insertMovieData = async () => {
    const response = await axios.post('http://localhost:8080/movies/new', {
      Name: movieName,
      YearOfRelease: yearOfRelease,
      Plot: plot,
      Producer: producer,
      Actors: actors,
    });
    console.log(response);
    if (response.data.success) {
      handleReset();
    }
  };
  function validateForm() {
    if (movieName.length <= 0) {
      setErrorMessage('Please enter a Movie Name');
      return true;
    } else if (yearOfRelease.length <= 0) {
      setErrorMessage('Please enter the year of release');
      return true;
    } else if (producer.length <= 0) {
      setErrorMessage('Please select the producer');
      return true;
    } else if (actors.length <= 0) {
      setErrorMessage('Please select the actors');
      return true;
    }
    return false;
  }
  function submitMovieFormData() {
    const error = validateForm();
    setErrorStatus(error);
    if (!errorStatus) editMode ? updateMovieData() : insertMovieData();
  }
  function handleClose() {
    handleReset();
    changeVisibility();
  }
  if (visibility) {
    return (
      <div className="form-group container">
        <div className="alert alert-danger" hidden={!errorStatus}>
          {errorMessage}
        </div>
        <div>
          <label>Movie Name</label>
          <input
            className="form-control"
            type="text"
            value={movieName}
            onChange={handleMovieNameChange}
          ></input>
        </div>
        <div>
          <label>Year Of Release</label>
          <input
            className="form-control"
            type="text"
            value={yearOfRelease}
            onChange={handleYearOfReleaseChange}
          ></input>{' '}
        </div>
        <div>
          <label>Plot</label>
          <input
            className="form-control"
            type="text"
            value={plot}
            onChange={handlePlotChange}
          ></input>{' '}
        </div>
        <div>
          <label>Producer</label>
          <ProducerDropdown
            className="form-group"
            producerChange={handleProducerChange}
            producer={producer}
            producers={producerList}
          />
          <div>
            <button
              className="btn btn-light spacing"
              onClick={() => {
                setProducerFormVisibility(true);
              }}
              disabled={producerFormVisibility}
            >
              + Add New Producer
            </button>
            <ProducerForm
              visibility={producerFormVisibility}
              visibilityChange={handleProducerFormVisibilityChange}
            />
          </div>
        </div>
        <div>
          <label>Actors</label>
          <ActorDropdown
            className="form-group"
            actorsChange={handleActorChange}
            actors={actors}
            actorList={actorList}
          />
          <div>
            <button
              className="btn btn-light spacing"
              onClick={() => {
                setActorFormVisibility(true);
              }}
              disabled={actorformVisibility}
            >
              + Add New Actor
            </button>
            <ActorForm
              visibility={actorformVisibility}
              visibilityChange={handleActorFormVisibilityChange}
            />
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={submitMovieFormData}
            disabled={actorformVisibility || producerFormVisibility}
          >
            {editMode ? 'Update Movie' : 'Add Movie'}
          </button>
          <button
            className="btn btn-outline-danger"
            style={{ float: 'right' }}
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return null;
}

export default MovieForm;
