'use client';
import React, { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Selector = () => {
  const years = Array.from(
    { length: 2026 - 1950 + 1 },
    (_, index) => 2026 - index
  );

  const [makes, setMakes] = useState<string[]>([]); // Updated to an array
  const [dropValue, setDropValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Fetch car makes
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await fetch('/api/getMakes');
        const result = await response.json();
        if (response.ok) {
          setMakes(
            result.data.map((item: { MakeName: string }) => item.MakeName)
          );
        } else {
          setError(result.error || 'Failed to fetch makes.');
        }
      } catch (err) {
        setError('Failed to fetch data.');
      }
    };
    fetchMakes();
  }, []);

  // Handle selection change
  const updateDropValue = (value: string) => {
    setDropValue(value);
  };

  console.log(dropValue);

  return (
    <div className="grid items-center min-h-screen gap-6">
      {/* Year Dropdown */}
      <Select onValueChange={updateDropValue}>
        <SelectTrigger className="w-[400px]">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Car Model Year: {dropValue}</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Makes Dropdown */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a Make" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Car Make</SelectLabel>
            {makes.length > 0 ? (
              makes.map((make, index) => (
                <SelectItem key={index} value={make}>
                  {make}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="No makes available" disabled>
                No makes available
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Models Dropdown (Placeholder for now) */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Car Model</SelectLabel>
            <SelectItem value="TEST">MODEL</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Selector;
