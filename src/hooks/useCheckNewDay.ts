import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";

const useCheckNewDay = (onDifferentDay: () => void) => {
  const [today, setToday] = useLocalStorage(
    "today",
    new Date().toLocaleDateString()
  );

  useEffect(() => {
    const newToday = new Date().toLocaleDateString();
    if (newToday !== today) {
      setToday(newToday);
      onDifferentDay();
    }
  }, [onDifferentDay, setToday, today]);
};

export default useCheckNewDay;
