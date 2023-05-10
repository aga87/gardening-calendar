export const validateStartingMonthField = ({
  startingMonth,
  endingMonth
}: {
  startingMonth: string;
  endingMonth: string;
}): string => {
  if (startingMonth && endingMonth) return '';
  if (!startingMonth && !endingMonth) return '';
  if (!startingMonth) return 'Required if ending month is specified';
  return '';
};

export const validateEndingMonthField = ({
  startingMonth,
  endingMonth
}: {
  startingMonth: string;
  endingMonth: string;
}): string => {
  if (startingMonth && endingMonth) return '';
  if (!startingMonth && !endingMonth) return '';
  if (!endingMonth) return 'Required if starting month is specified';
  return '';
};
