import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        const days = String(
          Math.floor(difference / (1000 * 60 * 60 * 24))
        ).padStart(2, "0");
        const hours = String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((difference / (1000 * 60)) % 60)
        ).padStart(2, "0");

        setTimeRemaining({ days, hours, minutes });
      } else {
        setTimeRemaining({ days: "00", hours: "00", minutes: "00" });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer); // เคลียร์เมื่อคอมโพเนนต์ถูกลบ
  }, [targetDate]);

  return (
    <div>
      {timeRemaining.days} วัน : {timeRemaining.hours} ชม. :{" "}
      {timeRemaining.minutes} น.
    </div>
  );
};
