'use client'; // Client-side component
import React, { useEffect, useState } from 'react';

const DisplayModels = () => {
  const [models, setModels] = useState<string[]>([]); // State to store models
  const [error, setError] = useState<string | null>(null); // State to store error messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getModels'); // Fetch from your API route
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const result = await response.json();
        setModels(result.data.map((item: any) => item.baseModel)); // Extract and set the models
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, []);

  if (error) return <div>Error: {error}</div>; // Handle errors
  if (models.length === 0) return <div>Loading...</div>; // Show loading state

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
