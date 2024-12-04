'use client';
import React, { useState, useEffect } from 'react';
import Selector from '@/components/Selector';

const FetchAndDisplayModels = () => {
  const [models, setModels] = useState<string[]>([]); // State to store the models array
  const [years, setYears] = useState<string[]>([]); // State to store the years array
  const [makes, setMakes] = useState<string[]>([]); // State to store the makes array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseYears = await fetch('/api/getYears'); // Fetch data from API
        const responseModels = await fetch('/api/getModels'); // Fetch data from API
        const responseMakes = await fetch('/api/getMakes'); // Fetch data from API

        if (!responseYears.ok) {
          throw new Error('Failed to fetch years');
        }
        if (!responseMakes.ok) {
          throw new Error('Failed to fetch make');
        }
        if (!responseModels.ok) {
          throw new Error('Failed to fetch model');
        }

        setYears((await responseYears.json()).uniqueYears);
        setModels((await responseModels.json()).uniqueModels);
        setMakes((await responseMakes.json()).uniqueMakes);
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
      <Selector
        optionsYears={years}
        optionsModels={models}
        optionsMakes={makes}
      />
    </div>
  );
};

export default FetchAndDisplayModels;
