import { useEffect, useRef, useState } from "react";

interface CountdownProps {
  startFrom?: number;
  endAt?: number;
  intervalDuration?: number;
  startImmediately?: boolean;
  pauseInitially?: boolean;
}

export function useCountdown({
  startFrom = 60,
  endAt = 0,
  intervalDuration = 1000,
  startImmediately = false,
  pauseInitially = false,
}: CountdownProps) {
  const [countdown, setCountdown] = useState<number>(
    startImmediately || pauseInitially ? startFrom : 0
  );
  const [isPaused, setIsPaused] = useState<boolean>(pauseInitially);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (countdown > endAt && !isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, intervalDuration);
    }
  }, [countdown, isPaused]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    countdown,
    isCountdownComplete: countdown === endAt,
    startCountdown: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setCountdown(
        // @ts-ignore
        countdown === startFrom ? String(startFrom) : startFrom
      );
    },
    isPaused,
    pause: () => setIsPaused(true),
    unPause: () => setIsPaused(false),
    setCurrentValue: setCountdown,
  };
}
