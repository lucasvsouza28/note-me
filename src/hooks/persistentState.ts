import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T) => Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const cachedValue = localStorage.getItem(key);

    if (cachedValue) setState(JSON.parse(cachedValue) as T);
  }, [key])

  const persistentSet = (value: T): Dispatch<SetStateAction<T>> => {
    localStorage.setItem(key, JSON.stringify(value, getCircularReplacer()));
    setState(value)

    return setState;
  }

  return [state, persistentSet];
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};


export default usePersistentState;
