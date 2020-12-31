import React, { useState, useEffect } from 'react';

function ProducerDropdown({ producerChange, producer, producers }) {
  const [producerOptions, setProducerOptions] = useState();
  useEffect(() => {
    if (producers.length > 0) fetchProducerOptions();
  }, [producers]);

  function fetchProducerOptions() {
    const optionList = producers.map((option) => {
      return (
        <option value={option._id} key={option._id}>
          {option.Name}
        </option>
      );
    });
    setProducerOptions(optionList);
  }
  function handleProducerSelect(event) {
    producerChange(event.target.value);
  }
  return (
    <select
      name="producers"
      onChange={handleProducerSelect}
      value={producer}
      className="form-control"
    >
      <option value="" disabled>
        Select
      </option>
      {producerOptions}
    </select>
  );
}

export default ProducerDropdown;
