import React from 'react';
import styles from './binary-table-data-row.module.scss';

type BinaryTableDataRowProps = {
  variant: 'primary' | 'secondary';
  binaryData: (0 | 1)[];
};

export const BinaryTableDataRow = ({
  variant,
  binaryData
}: BinaryTableDataRowProps) => {
  let className = styles.one;
  if (variant === 'secondary') {
    className = `${className} ${styles['one--secondary']}`;
  }

  const tableData = binaryData.map((data, i) => {
    if (data === 0) return <td key={i} className={styles.zero} />;
    return <td key={i} className={className} />;
  });

  return <tr>{tableData}</tr>;
};
