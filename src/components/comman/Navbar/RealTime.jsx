import React, { useState, useEffect } from 'react';

const RealTimeClockAndCube = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeString = formatTime(now);
      setCurrentTime(timeString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: true });
  };

  return (
    <div className="lg:text-2xl text-white font-bold">
      <div className="text-center">
        <h2 className="text-lg font-bold">{currentTime}</h2>
      </div>
    </div>
  );
};

export default RealTimeClockAndCube;
