import type { Month, MonthName } from '../types';

const getSowingDataLabel = ({
  sowFrom,
  sowUntil
}: {
  sowFrom: MonthName | null;
  sowUntil: MonthName | null;
}): string => {
  let sowingDataLabel = '';
  if (!sowFrom || !sowUntil) {
    sowingDataLabel = 'No sowing data.';
  } else if (sowFrom === sowUntil) {
    sowingDataLabel = `Sow in ${sowFrom}.`;
  } else {
    sowingDataLabel = `Sow from ${sowFrom} to ${sowUntil}.`;
  }
  return sowingDataLabel;
};

const getHarvestDataLabel = ({
  harvestFrom,
  harvestUntil
}: {
  harvestFrom: MonthName | null;
  harvestUntil: MonthName | null;
}): string => {
  let harvestDataLabel = '';
  if (!harvestFrom || !harvestUntil) {
    harvestDataLabel = 'No harvesting data.';
  } else if (harvestFrom === harvestUntil) {
    harvestDataLabel = `Harvest in ${harvestFrom}.`;
  } else {
    harvestDataLabel = `Harvest from ${harvestFrom} to ${harvestUntil}.`;
  }

  return harvestDataLabel;
};

export const getAccessiblePlantChartLabel = ({
  sowFrom,
  sowUntil,
  harvestFrom,
  harvestUntil
}: {
  sowFrom: Month | null;
  sowUntil: Month | null;
  harvestFrom: Month | null;
  harvestUntil: Month | null;
}): string => {
  const months: MonthName[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return `${getSowingDataLabel({
    sowFrom: sowFrom ? months[sowFrom - 1] : null,
    sowUntil: sowUntil ? months[sowUntil - 1] : null
  })} ${getHarvestDataLabel({
    harvestFrom: harvestFrom ? months[harvestFrom - 1] : null,
    harvestUntil: harvestUntil ? months[harvestUntil - 1] : null
  })}`;
};
