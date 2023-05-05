import React from 'react';
import { BinaryTableDataRow, Table } from '@/components';
import {
  getAccessiblePlantChartLabel,
  months,
  toZerosAndOnes
} from '../../utils';
import type { MonthName, Plant } from '../../types/types';
import styles from './plant-chart.module.scss';

type PlantChartProps = {
  sowFrom: Plant['sowFrom'];
  sowUntil: Plant['sowUntil'];
  harvestFrom: Plant['harvestFrom'];
  harvestUntil: Plant['harvestUntil'];
};

export const PlantChart = ({
  sowFrom,
  sowUntil,
  harvestFrom,
  harvestUntil
}: PlantChartProps) => {
  const accessibleChartLabel = getAccessiblePlantChartLabel({
    sowFrom,
    sowUntil,
    harvestFrom,
    harvestUntil
  });

  const monthHeadings = months.map((month: MonthName) => month.slice(0, 3));

  const binarySowingData = toZerosAndOnes({
    monthStart: sowFrom,
    monthEnd: sowUntil
  });

  const binaryHarvestingData = toZerosAndOnes({
    monthStart: harvestFrom,
    monthEnd: harvestUntil
  });

  return (
    <figure aria-label='chart'>
      <figcaption className={styles.chartCaption}>
        {accessibleChartLabel}
      </figcaption>
      <div aria-hidden='true'>
        <Table tableHeadings={monthHeadings}>
          <BinaryTableDataRow variant='primary' binaryData={binarySowingData} />
          <BinaryTableDataRow
            variant='secondary'
            binaryData={binaryHarvestingData}
          />
        </Table>
      </div>
    </figure>
  );
};
