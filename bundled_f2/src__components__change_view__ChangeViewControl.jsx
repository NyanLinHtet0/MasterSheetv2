import { useEffect, useRef, useState } from 'react';
import styles from './ChangeViewControl.module.css';

const VIEW_MODES = {
  LIVE: 'live',
  TRASH: 'trash',
};

function renderSingleChoiceColumn({
  title,
  options = [],
  selectedValue,
  onSelect,
  emptyLabel,
}) {
  return (
    <div className={styles.viewColumn}>
      <div className={styles.viewSectionTitle}>{title}</div>

      <div className={styles.viewOptionsList}>
        {options.length === 0 ? (
          <div className={styles.viewEmptyState}>{emptyLabel}</div>
        ) : (
          options.map((option) => {
            const isSelected = selectedValue === option.key;

            return (
              <label key={option.key} className={styles.viewOptionRow}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSelect(option.key)}
                />
                <span className={styles.viewOptionLabel}>
                  {option.label}
                </span>
              </label>
            );
          })
        )}
      </div>
    </div>
  );
}

function ChangeViewControl({
  viewMode,
  setViewMode,
  layer1Options = [],
  selectedLayer1Key = null,
  onSelectLayer1,
  layer2Options = [],
  selectedLayer2Key = null,
  onSelectLayer2,
  layer3Options = [],
  selectedLayer3Key = null,
  onSelectLayer3,
}) {
  const [showViewPopup, setShowViewPopup] = useState(false);
  const viewPopupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showViewPopup &&
        viewPopupRef.current &&
        !viewPopupRef.current.contains(event.target)
      ) {
        setShowViewPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showViewPopup]);

  return (
    <div className={styles.viewControlWrap} ref={viewPopupRef}>
      <button
        type="button"
        className={styles.viewButton}
        onClick={() => setShowViewPopup((prev) => !prev)}
      >
        Change View
      </button>

      {showViewPopup && (
        <div className={styles.viewPopup}>
          <div className={styles.viewPopupHeader}>
            <span className={styles.viewPopupTitle}>Change View</span>

            <div className={styles.viewPopupCurrentBlock}>
              <button
                type="button"
                className={`${styles.modeToggleButton} ${
                  viewMode === VIEW_MODES.LIVE ? styles.modeToggleButtonActive : ''
                }`}
                onClick={() => setViewMode(VIEW_MODES.LIVE)}
              >
                Live
              </button>

              <button
                type="button"
                className={`${styles.modeToggleButton} ${
                  viewMode === VIEW_MODES.TRASH ? styles.modeToggleButtonActive : ''
                }`}
                onClick={() => setViewMode(VIEW_MODES.TRASH)}
              >
                Trash
              </button>
            </div>
          </div>

          <div className={styles.viewColumns}>
            {renderSingleChoiceColumn({
              title: 'Layer 1',
              options: layer1Options,
              selectedValue: selectedLayer1Key,
              onSelect: onSelectLayer1,
              emptyLabel: 'No layer 1 items.',
            })}

            {renderSingleChoiceColumn({
              title: 'Layer 2',
              options: layer2Options,
              selectedValue: selectedLayer2Key,
              onSelect: onSelectLayer2,
              emptyLabel: 'No layer 2 items.',
            })}

            {renderSingleChoiceColumn({
              title: 'Layer 3',
              options: layer3Options,
              selectedValue: selectedLayer3Key,
              onSelect: onSelectLayer3,
              emptyLabel: 'No layer 3 items.',
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeViewControl;