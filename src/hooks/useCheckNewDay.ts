import { useEffect, useRef } from "react";

import useLocalStorage from "./useLocalStorage";

const useCheckNewDay = (onDifferentDay: () => void) => {
  const [today, setToday] = useLocalStorage(
    "today",
    new Date().toLocaleDateString()
  );

  const savedCB = useRef(onDifferentDay);
  useEffect(() => {
    savedCB.current = onDifferentDay;
  }, [onDifferentDay]);

  useEffect(() => {
    const checkForNewDay = () => {
      const newToday = new Date().toLocaleDateString();
      if (newToday !== today) {
        setToday(newToday);
        savedCB.current();
      }
    };

    checkForNewDay();

    const interval = setInterval(checkForNewDay, 60 * 1000);

    return () => clearInterval(interval);
  }, [onDifferentDay, setToday, today]);
};

export default useCheckNewDay;
