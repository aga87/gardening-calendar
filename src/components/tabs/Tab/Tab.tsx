import React from 'react';
import styles from './tab.module.scss';

type TabProps = {
  text: string;
  selected: boolean;
  tabPanelId: string;
  handleClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary';
};

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      variant = 'primary',
      text,
      selected,
      tabPanelId,
      handleClick,
      handleKeyDown
    }: TabProps,
    ref
  ) => {
    let className = styles.tab;
    if (variant === 'secondary') {
      className = `${className} ${styles['tab--secondary']}`;
    }
    if (selected) {
      className = `${className} ${styles['tab--selected']}`;
    }

    return (
      <button
        type='button'
        role='tab'
        ref={ref}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={className}
        aria-selected={selected}
        tabIndex={selected ? 0 : -1} // Roving tabindex
        aria-controls={tabPanelId}
      >
        {text.toUpperCase()}
      </button>
    );
  }
);

Tab.displayName = 'Tab';
