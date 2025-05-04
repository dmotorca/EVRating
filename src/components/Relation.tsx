import React from 'react';
import EnterAnimation from './EnterAnimation';

interface RelationProps {
  personalco2: string;
}

const Relation: React.FC<RelationProps> = ({ personalco2 }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Relation</h1>
      <p className="text-lg">Your personal CO2 emissions: {personalco2}</p>
      <EnterAnimation></EnterAnimation>
    </div>
  );
};

export default Relation;
