'use client';

import React, { useState } from 'react';
import makesData from '../JSON/Makes.json';

console.log(makesData);

const VehicleSelector = () => {
  const [selectedMake, setSelectedMake] = useState<string>('Toyota'); // Default make

  const fetchModels = async () => {
    try {
      // Pass the `selectedMake` to the API
      const response = await fetch(`/api/getModelsByMake?make=${selectedMake}`);
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      const data = await response.json();
      //Below is uniqueModels
      //Data is the Make
      console.log('HI: ', data.uniqueModels); // Log or handle the response data
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  return (
    <div>
      <h1>Select Vehicle Make</h1>
      <select
        onChange={(e) => setSelectedMake(e.target.value)}
        value={selectedMake}
      >
        {makesData.uniqueMakes.map((make, index) => (
          <option key={index} value={make}>
            {make}
          </option>
        ))}
      </select>
      <button onClick={fetchModels}>Fetch Models</button>
    </div>
  );
};

export default VehicleSelector;
