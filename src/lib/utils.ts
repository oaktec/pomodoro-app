import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
    seconds < 10 ? "0" + seconds.toString() : seconds
  }`;
};
