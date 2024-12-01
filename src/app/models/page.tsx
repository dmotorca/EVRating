'use client';
import React, { useEffect, useState } from 'react';
import 

const DisplayModels = () => {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseModels = await setModel(); // Call the API function
        const response = await fetch('/api/getMakes');
      setModels(baseModels!); // Set the state with fetched models
    };

    fetchData(); // Execute the fetch function
  }, []);

  return (
    <div>
      <h2>Base Models:</h2>
      <ul>
        {models.map((model, index) => (
          <li key={index}>{model}</li> // Render each model in a list
        ))}
      </ul>
    </div>
  );
};

export default DisplayModels;
