import { useState, useEffect, useRef } from 'react';
import currency from 'currency.js';
import styles from './CorpDropdown.module.css';

function CorpDropdown({ corps = [], selectedCorp, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownRef = useRef(null);

  const hasValue = (val) => val !== null && val !== undefined && val !== '';
  const isInverseCorp = (corp) =>
    corp?.inverse === true || corp?.inverse === 1 || corp?.inverse === '1';

  const getCorpDisplayData = (corp) => {
    if (!corp) {
      return {
        mmkValue: 0,
        foreignValue: null,
        showForeign: false,
        foreignLabel: '',
      };
    }

    // Support both old and new variable names
    const rawMmk = corp.current_balance;
    const rawForeign = corp.is_foreign ? corp.current_foreign : null;

    const multiplier = corp.inverse ? -1 : 1;

    const mmkValue = currency(rawMmk || 0).multiply(multiplier).value;
    const foreignValue = currency(rawForeign || 0).multiply(multiplier).value;

    const showForeign = !!corp.is_foreign || hasValue(rawForeign);

    // Keep your old display fallback logic for foreign label
    const foreignLabel =
      corp.name?.split('ဝယ်စာရင်း')[0]?.trim() || '';

    return {
      mmkValue,
      foreignValue,
      showForeign,
      foreignLabel,
    };
  };
  const formatMmk = (val, isForeign = false) => {
    if (!isForeign) {
      return currency(val || 0, { symbol: '', precision: 0 }).format();
    }

    const mmk = currency(val || 0, { symbol: '', precision: 2 });

    return mmk.intValue % 100 === 0
      ? currency(mmk.value, { symbol: '', precision: 0 }).format()
      : mmk.format();
  };
  const formatForeign = (val) => {
    const foreign = currency(val || 0, { symbol: '', precision: 2 });
    return foreign.intValue % 100 === 0
      ? currency(foreign.value, { symbol: '', precision: 0 }).format()
      : foreign.format();
  };

  useEffect(() => {
    if (selectedCorp && !isOpen) {
      setSearchTerm(selectedCorp.name);
    }
  }, [selectedCorp, isOpen]);

  const handleOpenDropdown = () => {
    setIsOpen(true);
    setSearchTerm('');
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
    setSearchTerm(selectedCorp ? selectedCorp.name : '');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedCorp]);

  const filteredCorps = corps.filter((corp) =>
    (corp.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCorp = (corp) => {
    onSelect(corp);
    setSearchTerm(corp.name);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const selectedDisplay = getCorpDisplayData(selectedCorp);

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.activeHeader : ''}`}
        onClick={() => {
          if (!isOpen) handleOpenDropdown();
        }}
      >
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.searchInput}
            value={isOpen ? searchTerm : selectedCorp ? selectedCorp.name : 'None'}
            onChange={handleInputChange}
            onFocus={() => {
              if (!isOpen) handleOpenDropdown();
            }}
            placeholder="Search or select a corp..."
          />

          {!isOpen && selectedCorp && (
            <span className={styles.headerBalance}>
              {formatMmk(selectedDisplay.mmkValue, selectedDisplay.showForeign)}
            </span>
          )}
        </div>

        <div
          className={`${styles.caret} ${isOpen ? styles.caretOpen : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) {
              handleCloseDropdown();
            } else {
              handleOpenDropdown();
            }
          }}
        >
          ▼
        </div>
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {filteredCorps.length > 0 ? (
            filteredCorps.map((corp) => {
              const display = getCorpDisplayData(corp);

              return (
                <li
                  key={corp.id}
                  className={`${styles.dropdownItem} ${
                    isInverseCorp(corp) ? styles.inverseItem : ''
                  }`}
                  onClick={() => handleSelectCorp(corp)}
                >
                  <span
                    className={`${styles.corpName} ${
                      isInverseCorp(corp) ? styles.inverseCorpName : ''
                    }`}
                  >
                    {corp.name}
                  </span>

                  <div className={styles.corpBalance}>
                    <span>{formatMmk(display.mmkValue, display.showForeign)}</span>

                    {display.showForeign && (
                      <span className={styles.foreignText}>
                        {formatForeign(display.foreignValue)}
                        {display.foreignLabel ? ` ${display.foreignLabel}` : ''}
                      </span>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <li className={styles.noResults}>No corps found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CorpDropdown;
