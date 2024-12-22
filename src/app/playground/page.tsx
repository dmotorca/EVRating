import GreenMeter from '@/components/GreenMeter';
import { PieChart } from '@/components/PieChart';

import React from 'react';

const PlayGround = () => {
  return (
    <div className="bg-black">
      <GreenMeter></GreenMeter>
      <PieChart></PieChart>
    </div>
  );
};

export default PlayGround;
