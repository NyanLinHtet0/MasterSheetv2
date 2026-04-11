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

export default function ProfitSummarySheet({
  summaryData = [],
  title = 'Accounting Profit Summary',
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{title}</div>

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
              isTotal={row.isTotal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
