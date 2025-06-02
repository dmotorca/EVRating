import React from 'react';
import EnterAnimation from './EnterAnimation';

{
  /*This is a test page, I am trying to understand framer
  Average weight of a 2024 Toyota Camry is 3,340 pounds
  I will need to generate an animation that shows how many cars 
  worth of weight your vehicle emits(40,000 pounds, 80,000 pounds, etc.)
   */
}
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
