import { Dispatch, SetStateAction, useEffect } from 'react';

const useSessionStorage = <T>(key: string, setter: Dispatch<SetStateAction<T>>) => {
  useEffect(() => {
    const itemFromSessionStorage = window.sessionStorage.getItem(key);
    if (itemFromSessionStorage) {
      setter(JSON.parse(itemFromSessionStorage));
    }
  }, [key, setter]);
};

export default useSessionStorage;
