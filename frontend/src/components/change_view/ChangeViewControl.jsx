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
  isEditTableMode = false,
  onToggleEditTableMode,
  onAddLayer3,
  onRenameLayer3,
}) {
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [newLayer3Name, setNewLayer3Name] = useState('');
  const [editingLabels, setEditingLabels] = useState({});
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

  const handleRenameBlur = (option) => {
    if (!option?.editable || !onRenameLayer3) {
      return;
    }

    const draftName = (editingLabels[option.key] ?? option.label ?? '').trim();
    const originalName = (option.label || '').trim();

    if (!draftName || draftName === originalName) {
      setEditingLabels((prev) => {
        const next = { ...prev };
        delete next[option.key];
        return next;
      });
      return;
    }

    onRenameLayer3(option.key, draftName);

    setEditingLabels((prev) => {
      const next = { ...prev };
      delete next[option.key];
      return next;
    });
  };

  const handleAddLayer3 = () => {
    const nextName = newLayer3Name.trim();

    if (!nextName || !onAddLayer3) {
      return;
    }

    onAddLayer3(nextName);
    setNewLayer3Name('');
  };

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
            <div className={styles.viewHeaderTopRow}>
              <span className={styles.viewPopupTitle}>Change View</span>
              <button
                type="button"
                className={`${styles.editTableButton} ${
                  isEditTableMode ? styles.editTableButtonActive : ''
                }`}
                onClick={() => onToggleEditTableMode?.()}
              >
                {isEditTableMode ? 'Done Editing' : 'Edit Table'}
              </button>
            </div>

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

            <div className={styles.viewColumn}>
              <div className={styles.viewSectionTitle}>Layer 3</div>

              {isEditTableMode ? (
                <>
                  <div className={styles.editInlineRow}>
                    <input
                      type="text"
                      value={newLayer3Name}
                      className={styles.editTextInput}
                      placeholder="Add local layer 3..."
                      onChange={(event) => setNewLayer3Name(event.target.value)}
                    />

                    <button
                      type="button"
                      className={styles.addButton}
                      onClick={handleAddLayer3}
                    >
                      Add
                    </button>
                  </div>

                  <div className={styles.viewOptionsList}>
                    {layer3Options.length === 0 ? (
                      <div className={styles.viewEmptyState}>No layer 3 items.</div>
                    ) : (
                      layer3Options.map((option) => {
                        const draftValue = editingLabels[option.key] ?? option.label;

                        return (
                          <div key={option.key} className={styles.viewOptionRow}>
                            <input
                              type="checkbox"
                              checked={selectedLayer3Key === option.key}
                              onChange={() => onSelectLayer3(option.key)}
                            />

                            {option.editable ? (
                              <input
                                type="text"
                                value={draftValue}
                                className={styles.editTextInput}
                                onChange={(event) =>
                                  setEditingLabels((prev) => ({
                                    ...prev,
                                    [option.key]: event.target.value,
                                  }))
                                }
                                onBlur={() => handleRenameBlur(option)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter') {
                                    event.currentTarget.blur();
                                  }
                                }}
                              />
                            ) : (
                              <span className={styles.viewOptionLabel}>{option.label}</span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </>
              ) : (
                <div className={styles.viewOptionsList}>
                  {layer3Options.length === 0 ? (
                    <div className={styles.viewEmptyState}>No layer 3 items.</div>
                  ) : (
                    layer3Options.map((option) => {
                      const isSelected = selectedLayer3Key === option.key;

                      return (
                        <label key={option.key} className={styles.viewOptionRow}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onSelectLayer3(option.key)}
                          />

                          <span className={styles.viewOptionLabel}>
                            {option.label}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeViewControl;
