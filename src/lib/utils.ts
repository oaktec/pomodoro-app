import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeMinsSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes < 10 ? "0" + minutes.toString() : minutes}:${
    seconds < 10 ? "0" + seconds.toString() : seconds
  }`;
};

export const formatTimeHoursMins = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours}:${minutes < 10 ? "0" + minutes.toString() : minutes}`;
};

export const showNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    void new Notification(title, {
      body,
      requireInteraction: true,
    });
  }
};
