import React, { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from './useOnClickOutside';

type ReturnType = {
  isOpen: boolean;
  dropdownToggleRef: React.MutableRefObject<HTMLElement | null>;
  dropdownItemsRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  hideDropdown: () => void;
  handleDropdownToggleClick: () => void;
  handleDropdownToggleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleDropdownItemKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  outerRef: React.MutableRefObject<HTMLElement | null>; // to hide the dropdown on click outside
};

export const useDropdown = (dropdownItemsCount: number): ReturnType => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownItemsRefs = useRef<(HTMLElement | null)[]>([]);
  const dropdownToggleRef = useRef<HTMLElement | null>(null);
  const [focusedItem, setFocusedItem] = useState(-1);

  // Optionally, hide menu dropdown on click outside
  const outerRef = useRef<HTMLElement | null>(null);
  useOnClickOutside(outerRef, () => setIsOpen(false));

  const handleDropdownToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const hideDropdown = () => {
    setIsOpen(false);
  };

  const handleDropdownToggleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { key } = e;
    switch (key) {
      case 'Down': // Edge
      case 'ArrowDown':
      case 'Space':
      case 'Enter': {
        e.preventDefault();
        setFocusedItem(0);
        setIsOpen(true);
        break;
      }
      case 'Up': // Edge
      case 'ArrowUp': {
        e.preventDefault();
        setFocusedItem(dropdownItemsCount - 1);
        setIsOpen(true);
        break;
      }
      default:
    }
  };

  const handleDropdownItemKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const { key } = e;
    switch (key) {
      case 'Enter':
      case 'Space': {
        e.preventDefault();
        const target = e.target as HTMLElement;
        target.click();
        break;
      }
      case 'Esc': // Edge
      case 'Escape': {
        e.preventDefault();
        setIsOpen(false);
        setFocusedItem(-1);
        break;
      }
      case 'Up': // Edge
      case 'ArrowUp':
      case 'Left': // Edge
      case 'ArrowLeft': {
        e.preventDefault();
        setFocusedItem(
          focusedItem === 0 ? dropdownItemsCount - 1 : focusedItem - 1
        );
        break;
      }
      case 'Down': // Edge
      case 'ArrowDown':
      case 'Right': // Edge
      case 'ArrowRight': {
        e.preventDefault();
        setFocusedItem(
          focusedItem === dropdownItemsCount - 1 ? 0 : focusedItem + 1
        );
        break;
      }
      case 'Home':
        e.preventDefault();
        setFocusedItem(0);
        break;
      case 'End': {
        e.preventDefault();
        setFocusedItem(dropdownItemsCount - 1);

        break;
      }
      default:
    }
  };

  useEffect(() => {
    if (focusedItem === -1) {
      dropdownToggleRef.current?.focus();
    } else {
      dropdownItemsRefs.current[focusedItem]?.focus();
    }
  }, [focusedItem, isOpen]);

  return {
    isOpen,
    dropdownToggleRef,
    dropdownItemsRefs,
    hideDropdown,
    handleDropdownToggleClick,
    handleDropdownToggleKeyDown,
    handleDropdownItemKeyDown,
    outerRef
  };
};
