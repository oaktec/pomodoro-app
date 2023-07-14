import { useState, useEffect } from "react";

type SetValue<T> = React.Dispatch<React.SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error getting local storage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage item ${key}`, error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
