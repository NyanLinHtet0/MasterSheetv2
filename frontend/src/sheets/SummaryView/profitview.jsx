import React, { useState } from 'react';
import styles from './profitview.module.css';

function SummaryRow({
  label,
  value,
  children,
  defaultOpen = false,
  level = 0,
  bold = false,
  isTotal = false,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = Array.isArray(children) && children.length > 0;

  const rowClassName = [
    styles.row,
    hasChildren ? styles.rowClickable : '',
    isTotal ? styles.rowTotal : '',
    bold ? styles.rowBold : '',
    level === 0 ? styles.rowLevel0 : styles.rowLevelChild,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen((prev) => !prev)}
        className={rowClassName}
        style={{ paddingLeft: `${16 + level * 28}px` }}
      >
        <div className={styles.rowLeft}>
          {hasChildren ? (
            <span className={styles.arrow}>{open ? '▾' : '▸'}</span>
          ) : (
            <span className={`${styles.arrow} ${styles.arrowEmpty}`} />
          )}

          <span>{label}</span>
        </div>

        <div className={styles.value}>{value}</div>
      </div>

      {hasChildren && open && (
        <div>
          {children.map((child, index) => (
            <SummaryRow
              key={`${child.label}-${index}`}
              label={child.label}
              value={child.value}
              children={child.children}
              defaultOpen={child.defaultOpen}
              level={level + 1}
              bold={child.bold}
              isTotal={child.isTotal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfitSummarySheet() {
  const summaryData = [
    {
      label: 'Total Sales',
      value: '2,450,000',
      defaultOpen: true,
      bold: true,
      children: [
        {
          label: 'Total sales (qty)',
          value: '1,500,000',
          defaultOpen: true,
          children: [
            { label: 'Item A (qty)', value: '900,000' },
            { label: 'Item B (qty)', value: '600,000' },
          ],
        },
        {
          label: 'Total credit sales (qty)',
          value: '950,000',
          defaultOpen: true,
          children: [
            { label: 'Item A (qty)', value: '500,000' },
            { label: 'Item B (qty)', value: '450,000' },
          ],
        },
      ],
    },
    {
      label: 'Total Purchases (qty)',
      value: '1,100,000',
      defaultOpen: true,
      bold: true,
      children: [
        { label: 'Item A (qty)', value: '700,000' },
        { label: 'Item B (qty)', value: '400,000' },
      ],
    },
    {
      label: 'Total Expenses',
      value: '350,000',
      defaultOpen: true,
      bold: true,
      children: [
        { label: 'General expense', value: '120,000' },
        { label: 'Regular expense', value: '150,000' },
        { label: 'Maintenance expense', value: '80,000' },
      ],
    },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>Accounting Profit Summary</div>

      <div className={styles.body}>
        <div className={styles.scrollArea}>
          {summaryData.map((row, index) => (
            <SummaryRow
              key={`${row.label}-${index}`}
              label={row.label}
              value={row.value}
              children={row.children}
              defaultOpen={row.defaultOpen}
              bold={row.bold}
            />
          ))}
        </div>

        <div className={styles.profitTotal}>
          <span>Total Profit</span>
          <span>1,000,000</span>
        </div>
      </div>
    </div>
  );
}