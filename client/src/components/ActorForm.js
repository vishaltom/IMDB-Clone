import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function ActorForm({ visibility, visibilityChange }) {
  const [actorName, setActorName] = useState('');
  const [actorDOB, setActorDOB] = useState('');
  const [actorGender, setActorGender] = useState('');
  const [actorBio, setActorBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  function handleActorNameChange(event) {
    setActorName(event.target.value);
  }
  function handleActorDOBChange(event) {
    setActorDOB(event.target.value);
  }
  function handleActorBioChange(event) {
    setActorBio(event.target.value);
  }
  function handleActorGenderChange(event) {
    setActorGender(event.target.value);
  }
  function handleReset() {
    setActorName('');
    setActorDOB('');
    setActorGender('');
    setActorBio('');
    visibilityChange();
    setErrorStatus(false);
    setErrorMessage('');
  }
  const insertActorData = async () => {
    const response = await axios.post('http://localhost:8080/actors/new', {
      Name: actorName,
      DOB: actorDOB,
      Gender: actorGender,
      Bio: actorBio,
    });
    if (response.data.success) {
      handleReset();
    }
  };
  function handleClose() {
    handleReset();
    visibilityChange();
  }
  function validateForm() {
    if (actorName.length <= 0) {
      setErrorMessage(`Please enter the Actor's Name`);
      return true;
    } else if (actorDOB.length <= 0) {
      setErrorMessage('Please enter the date of birth');
      return true;
    } else if (actorGender.length <= 0) {
      setErrorMessage('Please enter the gender');
      return true;
    }
    console.log('Validation');
    return false;
  }
  function submitActorFormData() {
    const error = validateForm();
    console.log(error);
    setErrorStatus(error);
    console.log(actorName, 'Before Insert');
    if (!errorStatus) insertActorData();
  }

  if (visibility) {
    return (
      <div className="form container container2">
        <div className="alert alert-danger" hidden={!errorStatus}>
          {errorMessage}
        </div>
        <div style={{ marginBottom: '25px' }}>
          <h3>Actor Details</h3>
          <button
            className="btn btn-sm btn-outline-danger"
            style={{ float: 'right' }}
            onClick={handleClose}
          >
            Close
          </button>
        </div>

        <div>
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            value={actorName}
            onChange={handleActorNameChange}
          ></input>
        </div>
        <div>
          <label>Date Of Birth</label>
          <input
            className="form-control"
            type="date"
            value={actorDOB}
            onChange={handleActorDOBChange}
          ></input>{' '}
        </div>
        <div>
          <label>Gender</label>
          <input
            className="form-control"
            type="text"
            value={actorGender}
            onChange={handleActorGenderChange}
          ></input>{' '}
        </div>
        <div>
          <label>Bio</label>
          <input
            className="form-control"
            type="text"
            value={actorBio}
            onChange={handleActorBioChange}
          ></input>{' '}
        </div>
        <button
          className="btn btn-light"
          onClick={submitActorFormData}
          style={{ marginTop: '20px' }}
        >
          Add Actor
        </button>
      </div>
    );
  }
  return null;
}

export default ActorForm;
