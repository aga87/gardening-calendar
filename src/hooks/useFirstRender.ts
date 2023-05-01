import { useEffect, useRef } from 'react';

export const useFirstRender = () => {
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  return isFirstRenderRef.current;
};
