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

import { Input } from '@/components/ui/input';
import Graph from './Graph';
import { Label } from './ui/label';

interface SelectorProps {
  optionsYears: string[]; // Array of years
  optionsMakes: string[]; // Array of makes
}

const Selector: React.FC<SelectorProps> = ({ optionsYears, optionsMakes }) => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedEmissions, setSelectedEmissions] = useState<string>('');
  const [miles, setMiles] = useState<string>(''); // New state for miles driven
  const [optionsModels, setOptionsModels] = useState<string[]>([]); // Models dynamically fetched
  const [error, setError] = useState<string | null>(null);

  // Fetch models dynamically based on selected make and year
  useEffect(() => {
    const fetchModels = async () => {
      if (selectedYear && selectedMake) {
        try {
          const response = await fetch(
            `/api/getModelsByMakeAndYear?make=${selectedMake}&year=${selectedYear}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch models');
          }

          const data = await response.json();
          setOptionsModels(data.models || []);
        } catch (err) {
          console.error('Error fetching models:', err);
          setError('Failed to load models. Please try again.');
        }
      }
    };

    fetchModels();
  }, [selectedYear, selectedMake]);

  // Fetch emissions dynamically based on selected make, year, and model
  useEffect(() => {
    const fetchEmissions = async () => {
      if (selectedYear && selectedMake && selectedModel) {
        try {
          const response = await fetch(
            `/api/getEmissions?make=${selectedMake}&year=${selectedYear}&model=${selectedModel}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch emissions');
          }

          const dataEmission = await response.json();
          setSelectedEmissions(dataEmission.co2TailpipeGpm);
        } catch (err) {
          console.error('Error fetching emissions:', err);
          setError('Failed to load emissions. Please try again.');
        }
      }
    };

    fetchEmissions();
  }, [selectedYear, selectedMake, selectedModel]);

  return (
    <div className="flex flex-col gap-4 mx-2.5 pt-5 ">
      {/* Year Selector */}
      <Select onValueChange={setSelectedYear}>
        <Label className="font-semibold lg:text-lg">Vehicle Year</Label>
        <SelectTrigger className=" sm:w-max lg:w-[700px] lg:text-lg">
          <SelectValue placeholder="Select a Year" />
        </SelectTrigger>
        <SelectContent className="lg:text-lg h-56">
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
        <Label className="font-semibold lg:text-lg">Vehicle Make</Label>
        <SelectTrigger className=" sm:w-max lg:w-[700px] lg:text-lg">
          <SelectValue placeholder="Select a Make" />
        </SelectTrigger>
        <SelectContent className="lg:text-lg h-56">
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
      <Select onValueChange={setSelectedModel}>
        <Label className="font-semibold lg:text-lg">Vehicle Model</Label>
        <SelectTrigger className=" sm:w-max lg:w-[700px] lg:text-lg">
          <SelectValue placeholder="Select a Model" />
        </SelectTrigger>
        <SelectContent className="lg:text-lg h-56">
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

      {/* Miles Driven */}
      <div className="flex flex-col gap-2">
        <label htmlFor="miles-driven" className="text-sm font-semibold">
          Annual Miles Driven
        </label>
        <Input
          id="miles-driven"
          type="number"
          placeholder="Enter estimated miles driven per year"
          className="sm:w-[350px]lg:[w-550px]"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pass both emissions and miles to Graph */}
      <Graph
        personalco2={selectedEmissions || '0'}
        milesDriven={miles || '0'}
      />
    </div>
  );
};

export default Selector;
