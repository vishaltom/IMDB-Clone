import React, { useState, useEffect } from 'react';

function ActorDropdown({ actorsChange, actors, actorList }) {
  const [actorOptions, setActorOptions] = useState();
  useEffect(() => {
    if (actorList.length > 0) fetchActorOptions();
  }, [actorList]);

  function fetchActorOptions() {
    const optionList = actorList.map((option) => {
      return (
        <option value={option._id} key={option._id}>
          {option.Name}
        </option>
      );
    });
    setActorOptions(optionList);
  }

  function handleActorSelect(event) {
    const actorList = Array.from(
      event.target.selectedOptions,
      (item) => item.value
    );
    actorsChange(actorList);
  }
  return (
    <select
      name="actors"
      multiple
      onChange={handleActorSelect}
      value={actors}
      className="form-control"
    >
      <option value="" disabled>
        Select
      </option>
      {actorOptions}
    </select>
  );
}

export default ActorDropdown;
