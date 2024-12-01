'use client';
import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectorProps {
  options: string[];
}

const Selector: React.FC<SelectorProps> = ({ options }) => {
  return (
    <Select>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((model, index) => (
            <SelectItem key={index} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Selector;
