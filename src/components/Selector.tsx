'use client';
import React, { useState } from 'react';

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
  optionsModels: string[]; // Array of models
}

const Selector: React.FC<SelectorProps> = ({
  optionsYears,
  optionsMakes,
  optionsModels,
}) => {
  // State for each selection
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

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
      <Select onValueChange={setSelectedModel}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select a Model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {optionsModels.map((model, index) => (
              <SelectItem key={index} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Selector;
