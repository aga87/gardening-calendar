import type { Month } from '../types';

export const toZerosAndOnes = ({
  monthStart,
  monthEnd
}: {
  monthStart: Month | null;
  monthEnd: Month | null;
}): (0 | 1)[] => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return months.map(month => {
    // If either monthStart or monthEnd is null, return 0 for all months
    if (monthStart === null || monthEnd === null) return 0;

    // If monthStart and monthEnd are the same, return 1 for that month only
    if (monthStart === monthEnd && month === monthStart) return 1;

    // If monthStart is before monthEnd, return 1 for months between them (inclusive)
    if (monthStart < monthEnd && month >= monthStart && month <= monthEnd)
      return 1;

    // If monthStart is after monthEnd, return 1 for months between them (inclusive)
    if (monthStart > monthEnd && (month >= monthStart || month <= monthEnd)) {
      return 1;
    }

    // For all other cases, return 0
    return 0;
  });
};
