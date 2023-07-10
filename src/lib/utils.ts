import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getModeColor(type: string) {
  switch (type) {
    case "pomodoro":
      return "red";
    case "short break":
      return "teal";
    case "long break":
      return "purple";
    default:
      return "background";
  }
}
