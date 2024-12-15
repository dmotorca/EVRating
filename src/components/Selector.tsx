'use client';
import React, { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectorProps {
  optionsYears: string[]; // Array of years
  optionsMakes: string[]; // Array of makes
  optionsEngines: string[];
}

const Selector: React.FC<SelectorProps> = ({ optionsYears, optionsMakes }) => {
  // State for each selection
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedEngines, setSelectedEngines] = useState<string>('');
  const [optionsModels, setOptionsModels] = useState<string[]>([]); // Models dynamically fetched
  const [optionsEngines, setOptionsEngines] = useState<string[]>([]); // Engines dynamically fetched
  const [error, setError] = useState<string | null>(null);

  // Fetch models dynamically based on selected make and year
  useEffect(() => {
    const fetchModels = async () => {
      if (selectedYear && selectedMake) {
        try {
          const response = await fetch(
            `/api/getModelsByMakeAndYear?make=${selectedMake}&year=${selectedYear}`
          );

          const responseEngines = await fetch(
            `/api/getEnginesByMakeAndYear?make=${selectedMake}&year=${selectedYear}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch models');
          }

          const data = await response.json();
          const dataEngine = await responseEngines.json();
          setOptionsModels(data.models || []);
          setOptionsEngines(dataEngine.engines || []);
        } catch (err) {
          console.error('Error fetching models:', err);
          setError('Failed to load models. Please try again.');
        }
      }
    };

    fetchModels();
  }, [selectedYear, selectedMake, selectedEngines]);

  return (
    <div className="flex flex-col gap-4">
      {/* Year Selector */}
      <Select onValueChange={setSelectedYear}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionsYears.map((year, index) => (
              <SelectItem key={index} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Make Selector */}
      <Select onValueChange={setSelectedMake}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a Make" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionsMakes.map((make, index) => (
              <SelectItem key={index} value={make}>
                {make}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Model Selector */}
      <Select>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionsModels.length > 0 ? (
              optionsModels.map((model, index) => (
                <SelectItem key={index} value={model}>
                  {model}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled={true} value={'value'}>
                No models available for this year and make
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Engine Selector */}
      <Select>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Please Select Engine Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionsEngines.length > 0 ? (
              optionsEngines.map((engines, index) => (
                <SelectItem key={index} value={engines}>
                  {engines}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled={true} value={'value'}>
                No engines found for this make and model
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Selector;
