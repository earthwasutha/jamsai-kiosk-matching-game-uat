import React, { useEffect, useState } from "react";

interface CountdownProps {
  onCountdownFinish: () => void;
}

const Countdown = ({ onCountdownFinish }: CountdownProps) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onCountdownFinish();
    }
  }, [count, onCountdownFinish]);

  return (
    <>
      <div className="backdrop-blur-sm bg-white/30 absolute inset-0"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex items-center justify-center h-screen">
          {count > 0 ? (
            <span
              key={count}
              className="text-9xl font-bold animate-pulse transform scale-150 opacity-50 transition-transform duration-1000"
            >
              {count}
            </span>
          ) : (
            <span className="text-9xl font-bold animate-pulse"></span>
          )}
        </div>
      </div>
    </>
  );
};

export default Countdown;
