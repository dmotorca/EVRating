'use client';

import React, { useState } from 'react';

const VehicleSelector = () => {
  const [selectedMake, setSelectedMake] = useState<string>('Toyota'); // Default make

  const fetchModels = async () => {
    try {
      // Pass the `selectedMake` to the API
      const response = await fetch(`/api/getModelsByMake?make=${selectedMake}`);
      const data = await response.json();

      console.log(data.uniqueModels); // Log or handle the response data
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  return (
    <div>
      <h1>Select Vehicle Make</h1>
      <select onChange={(e) => setSelectedMake(e.target.value)}>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
      </select>
      <button onClick={fetchModels}>Fetch Models</button>
    </div>
  );
};

export default VehicleSelector;
