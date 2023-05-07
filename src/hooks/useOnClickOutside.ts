import { useEffect } from 'react';

export const useOnClickOutside = (
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: (e: MouseEvent) => void
): void => {
  useEffect(() => {
    // (use native mouse event)
    const handleClickOutside = (e: MouseEvent) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler(e);
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, handler]);
};
