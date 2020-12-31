import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function ProducerForm({ visibility, visibilityChange }) {
  const [producerName, setProducerName] = useState('');
  const [producerDOB, setProducerDOB] = useState('');
  const [producerGender, setProducerGender] = useState('');
  const [producerBio, setProducerBio] = useState('');
  const [producerErrorMessage, setProducerErrorMessage] = useState('');
  const [producerErrorStatus, setProducerErrorStatus] = useState(false);

  function handleProducerNameChange(event) {
    setProducerName(event.target.value);
  }
  function handleProducerDOBChange(event) {
    setProducerDOB(event.target.value);
  }
  function handleProducerBioChange(event) {
    setProducerBio(event.target.value);
  }
  function handleProducerGenderChange(event) {
    setProducerGender(event.target.value);
  }
  function handleReset() {
    setProducerName('');
    setProducerDOB('');
    setProducerGender('');
    setProducerBio('');
    visibilityChange();
    setProducerErrorStatus(false);
    setProducerErrorMessage('');
  }
  function handleClose() {
    handleReset();
    visibilityChange();
  }

  const insertProducerData = async () => {
    const response = await axios.post('http://localhost:8080/producers/new', {
      Name: producerName,
      DOB: producerDOB,
      Gender: producerGender,
      Bio: producerBio,
    });
    console.log(response);
    if (response.data.success) {
      handleClose();
    }
  };

  function submitProducerFormData() {
    if (producerName.length <= 0) {
      setProducerErrorMessage(`Please enter the Producer's Name`);
      setProducerErrorStatus(true);
    } else if (producerDOB.length <= 0) {
      setProducerErrorMessage('Please enter the date of birth');
      setProducerErrorStatus(true);
    } else if (producerGender.length <= 0) {
      setProducerErrorMessage('Please enter the gender');
      setProducerErrorStatus(true);
    } else {
      insertProducerData();
    }
  }

  if (visibility) {
    return (
      <div className="form container container2">
        <div className="alert alert-danger" hidden={!producerErrorStatus}>
          {producerErrorMessage}
        </div>

        <div style={{ marginBottom: '25px' }}>
          <h3>Producer Details</h3>
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
            value={producerName}
            onChange={handleProducerNameChange}
          ></input>
        </div>
        <div>
          <label>Date Of Birth</label>
          <input
            className="form-control"
            type="date"
            value={producerDOB}
            onChange={handleProducerDOBChange}
          ></input>{' '}
        </div>
        <div>
          <label>Gender</label>
          <input
            className="form-control"
            type="text"
            value={producerGender}
            onChange={handleProducerGenderChange}
          ></input>{' '}
        </div>
        <div>
          <label>Bio</label>
          <input
            className="form-control"
            type="text"
            value={producerBio}
            onChange={handleProducerBioChange}
          ></input>{' '}
        </div>
        <button
          className="btn btn-light"
          style={{ marginTop: '20px' }}
          onClick={submitProducerFormData}
        >
          Add Producer
        </button>
      </div>
    );
  }
  return null;
}

export default ProducerForm;
