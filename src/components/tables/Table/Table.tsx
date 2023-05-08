import React from 'react';
import styles from './table.module.scss';

type TableProps = {
  tableHeadings: string[];
  children: React.ReactNode;
};

export const Table = ({ tableHeadings, children }: TableProps) => {
  const headings = tableHeadings.map(heading => (
    <th
      className={styles.table__heading}
      // Responsive table with cells of the same width
      style={{ width: `${100 / tableHeadings.length}%` }}
      key={heading}
    >
      {heading}
    </th>
  ));
  return (
    <table className={styles.table}>
      <thead>
        <tr>{headings}</tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
