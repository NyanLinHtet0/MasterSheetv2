export default function TransactionDateFields({
  styles,
  year,
  month,
  day,
  years,
  months,
  days,
  dayInputRef,
  onYearChange,
  onMonthChange,
  onDayChange,
}) {
  return (
    <div className={styles.inputRow}>
      <div className={styles.inputDatefields}>
        <select
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className={styles.flexInput}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className={styles.flexInput}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {new Date(2000, m - 1).toLocaleString('default', { month: 'short' })}
            </option>
          ))}
        </select>

        <select
          ref={dayInputRef}
          value={day}
          onChange={(e) => onDayChange(Number(e.target.value))}
          className={styles.flexInput}
        >
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}