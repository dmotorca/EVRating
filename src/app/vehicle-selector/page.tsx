'use client';
import React, { useState, useEffect } from 'react';
import Selector from '@/components/Selector';

const FetchAndDisplayModels = () => {
  const [models, setModels] = useState<string[]>([]); // State to store the models array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getModels'); // Fetch data from API
        if (!response.ok) {
          throw new Error('Failed to fetch models');
        }
        const result = await response.json();
        setModels(result.uniqueModels); // Set the array from the API response
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Handle errors

  return (
    <div>
      <h2>Select a Vehicle Model</h2>
      <Selector options={models} />{' '}
      {/* Pass the array of models to the Selector component */}
    </div>
  );
};

export default FetchAndDisplayModels;
