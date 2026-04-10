import styles from '../../ItemManagementOverlay.module.css';

export default function CategoryColumn({
  title,
  options = [],
  selectedValue,
  onSelect,
  editable = false,
  draftName,
  setDraftName,
  onAdd,
  emptyLabel,
  compact = false,
}) {
  return (
    <div className={styles.categoryColumn}>
      <div className={styles.sectionTitle}>{title}</div>

      {editable && (
        <div className={styles.editInlineRow}>
          <input
            type="text"
            value={draftName}
            className={styles.editInput}
            placeholder={`Add ${title} (ENG | BUR)...`}
            onChange={(event) => setDraftName(event.target.value)}
          />

          <button type="button" className={styles.addButton} onClick={onAdd}>
            Add
          </button>
        </div>
      )}

      <div className={styles.optionsList}>
        {options.length === 0 ? (
          <div className={styles.emptyList}>{emptyLabel}</div>
        ) : compact ? (
          <div className={styles.compactOptionsGrid}>
            {options.map((option) => {
              const isSelected = selectedValue === option.key;
              return (
                <button
                  type="button"
                  key={option.key}
                  className={`${styles.compactOptionChip} ${isSelected ? styles.compactOptionChipActive : ''}`}
                  onClick={() => onSelect?.(option.key)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          options.map((option) => {
            const isSelected = selectedValue === option.key;

            return (
              <label key={option.key} className={styles.optionRow}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSelect?.(option.key)}
                />
                <span className={styles.optionLabel}>{option.label}</span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}
