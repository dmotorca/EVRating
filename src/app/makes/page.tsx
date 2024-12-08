'use client';

import React, { useState } from 'react';

const makesData = {
  uniqueMakes: [
    'Alfa Romeo',
    'Ferrari',
    'Dodge',
    'Subaru',
    'Toyota',
    'Volkswagen',
    'Volvo',
    'Audi',
    'BMW',
    'Buick',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'CX Automotive',
    'Nissan',
    'Ford',
    'Hyundai',
    'Infiniti',
    'Lexus',
    'Mercury',
    'Mazda',
    'Oldsmobile',
    'Plymouth',
    'Pontiac',
    'Rolls-Royce',
    'Eagle',
    'Lincoln',
    'Mercedes-Benz',
    'GMC',
    'Saab',
    'Honda',
    'Saturn',
    'Mitsubishi',
    'Isuzu',
    'Jeep',
    'AM General',
    'Acura',
    'Geo',
    'Suzuki',
    'E. P. Dutton, Inc.',
    'Land Rover',
    'PAS, Inc',
    'Jaguar',
    'Lotus',
    'Grumman Olson',
    'Porsche',
    'American Motors Corporation',
  ],
};

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
      console.log(data.uniqueModels); // Log or handle the response data
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
