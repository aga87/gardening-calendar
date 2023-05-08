import { useId } from 'react';
import { useDropdown } from '@/hooks';
import styles from './custom-select.module.scss';

type CustomSelectProps = {
  options: string[];
  value: string;
  label: string;
  handleChange: (option: string) => void;
};

export const CustomSelect = ({
  label,
  options,
  value,
  handleChange
}: CustomSelectProps) => {
  const listboxId = useId();

  const {
    isOpen,
    dropdownToggleRef,
    dropdownItemsRefs,
    hideDropdown,
    handleDropdownToggleClick,
    handleDropdownToggleKeyDown,
    handleDropdownItemKeyDown
  } = useDropdown(options.length);

  const handleOptionSelect = (option: string) => {
    handleChange(option);
    hideDropdown();
  };

  let textClassName = styles.selected__text;
  if (isOpen) {
    textClassName = `${textClassName} ${styles['selected__text--isOpen']}`;
  }

  return (
    <div className={styles.select}>
      {/* WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/ */}
      <div
        className={styles.selected}
        role='combobox'
        aria-expanded={isOpen}
        aria-controls={listboxId}
        // TODO: aria-activedescendant={id of the focused option}
        aria-label={label}
        onClick={handleDropdownToggleClick}
        onKeyDown={handleDropdownToggleKeyDown}
        ref={el => (dropdownToggleRef.current = el)}
        tabIndex={0}
      >
        <span className={textClassName}>
          {label} {value}
        </span>
      </div>
      {isOpen && (
        <div className={styles.options} role='listbox' id={listboxId}>
          {options.map((option, i) => (
            <div
              className={styles.option}
              key={option}
              onClick={() => handleOptionSelect(option)}
              onKeyDown={handleDropdownItemKeyDown}
              ref={ref => {
                dropdownItemsRefs.current[i] = ref;
              }}
              role='option'
              aria-selected={value === option}
              tabIndex={-1}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
