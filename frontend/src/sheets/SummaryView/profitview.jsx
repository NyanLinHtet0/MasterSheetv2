import React, { useMemo, useState } from 'react';
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

  const levelClass =
    level === 0
      ? styles.rowLevel0
      : level === 1
      ? styles.rowLevel1
      : styles.rowLevel2;

  const labelClass =
    level === 0
      ? styles.labelLevel0
      : level === 1
      ? styles.labelLevel1
      : styles.labelLevel2;

  const valueClass =
    level === 0
      ? styles.valueLevel0
      : level === 1
      ? styles.valueLevel1
      : styles.valueLevel2;

  const rowClassName = [
    styles.row,
    hasChildren ? styles.rowClickable : '',
    isTotal ? styles.rowTotal : '',
    bold ? styles.rowBold : '',
    levelClass,
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

          <span className={`${styles.label} ${labelClass}`}>{label}</span>
        </div>

        <div
          className={`${styles.value} ${valueClass}`}
          style={{ marginRight: `${level * 12}px` }}
        >
          {value}
        </div>
      </div>

      {hasChildren && open && (
        <div>
          {children.map((child, index) => (
            <SummaryRow
              key={`${child.label}-${index}`}
              label={child.label}
              value={child.value}
              children={child.children}
              defaultOpen={false}
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
  const { displayRows, totalRow } = useMemo(() => {
    const totalIndex = summaryData.findIndex((row) => row?.isTotal);

    if (totalIndex === -1) {
      return {
        displayRows: summaryData,
        totalRow: null,
      };
    }

    return {
      displayRows: summaryData.filter((_, index) => index !== totalIndex),
      totalRow: summaryData[totalIndex],
    };
  }, [summaryData]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>{title}</div>

      <div className={styles.body}>
        <div className={styles.scrollArea}>
          {displayRows.map((row, index) => (
            <SummaryRow
              key={`${row.label}-${index}`}
              label={row.label}
              value={row.value}
              children={row.children}
              defaultOpen={false}
              bold={row.bold}
              isTotal={row.isTotal}
            />
          ))}
        </div>

        {totalRow && (
          <div className={styles.profitTotal}>
            <span>{totalRow.label}</span>
            <span>{totalRow.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}