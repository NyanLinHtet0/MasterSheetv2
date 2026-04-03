import { useState, useEffect, useRef } from 'react';
import styles from './CorpDropdown.module.css';

function CorpDropdown({ corps = [], selectedCorp, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selectedCorp && !isOpen) {
      setSearchTerm(selectedCorp.name);
    }
  }, [selectedCorp, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedCorp]);

  const handleOpenDropdown = () => {
    setIsOpen(true);
    setSearchTerm('');
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
    setSearchTerm(selectedCorp ? selectedCorp.name : '');
  };

  const filteredCorps = corps.filter(corp =>
    corp.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div
        className={`${styles.dropdownHeader} ${isOpen ? styles.activeHeader : ''}`}
        onClick={() => { if (!isOpen) handleOpenDropdown(); }}
      >
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.searchInput}
            value={isOpen ? searchTerm : (selectedCorp ? selectedCorp.name : 'None')}
            onChange={handleInputChange}
            onFocus={() => { if (!isOpen) handleOpenDropdown(); }}
            placeholder="Search or select a corp..."
          />
          
          {/* <--- APPLIED INVERSE TO HEADER DISPLAY ---> */}
          {!isOpen && selectedCorp && (
            <span className={styles.headerBalance}>
              {selectedCorp.total_mmk 
                  ? (selectedCorp.inverse ? -Number(selectedCorp.total_mmk) : Number(selectedCorp.total_mmk)).toLocaleString(undefined, {maximumFractionDigits: 0}) 
                  : 0}
            </span>
          )}
        </div>
        
        <div
          className={`${styles.caret} ${isOpen ? styles.caretOpen : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (isOpen) { handleCloseDropdown(); } else { handleOpenDropdown(); }
          }}
        >
          ▼
        </div>
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {filteredCorps.length > 0 ? (
            filteredCorps.map((corp, index) => (
              <li
                key={index}
                className={styles.dropdownItem}
                onClick={() => handleSelectCorp(corp)}
              >
                <span className={styles.corpName}>{corp.name}</span>
                {/* <--- APPLIED INVERSE TO DROPDOWN ITEMS DISPLAY ---> */}
                <div className={styles.corpBalance}>
                  <span>
                    {corp.total_mmk ? (corp.inverse ? -Number(corp.total_mmk) : Number(corp.total_mmk)).toLocaleString(undefined, {maximumFractionDigits: 0}) : 0}
                  </span>
                  
                  {corp.total_foreign ? (
                    <span className={styles.foreignText}>
                      {(corp.inverse ? -Number(corp.total_foreign) : Number(corp.total_foreign)).toLocaleString()} {corp.name.split('ဝယ်စာရင်း')[0].trim()}
                    </span>
                  ) : null}
                </div>
              </li>
            ))
          ) : (
            <li className={styles.noResults}>No corps found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CorpDropdown;