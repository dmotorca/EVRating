'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GreenMeter = () => {
  const [progress, setProgress] = useState(0); // State to control progress

  // Simulate progress animation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10)); // Reset or increment
    }, 500);
    return () => clearInterval(timer); // Cleanup interval
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-2/3 border-2 border-black rounded-full lg:h-14 lg:w-1/3 overflow-hidden">
        {/* Progress Bar */}
        <motion.div
          className="h-full bg-green-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5 }}
        />
      </div>
    </div>
  );
};

export default GreenMeter;
