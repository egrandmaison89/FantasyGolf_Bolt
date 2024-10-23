import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

interface DraftTimerProps {
  onTimeExpired: () => void;
}

export function DraftTimer({ onTimeExpired }: DraftTimerProps) {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per pick

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2">
      <Timer className="h-5 w-5 text-green-600" />
      <span className="text-xl font-mono">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}