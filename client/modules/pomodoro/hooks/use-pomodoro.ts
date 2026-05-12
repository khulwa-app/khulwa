"use client";

import { useEffect, useRef, useState } from "react";

type usePomodoroReturn = {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  currentRound: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
};

type Props = {
  duration?: number;
  rounds?: number;
  autoStart?: boolean;
};

export function usePomodoro({ duration = 25, rounds = 4, autoStart = false }: Props): usePomodoroReturn {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(autoStart ?? false);
  const [currentRound, setCurrentRound] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const skip = () => {
    if (currentRound < rounds) {
      setCurrentRound((prev) => prev + 1);
      setTimeLeft(duration * 60);
    } else {
      reset();
    }
  };
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    setCurrentRound(1);
  };

  return { minutes, seconds, isRunning, start, pause, reset, skip, currentRound };
}
