import styles from './view.module.css';

function ViewFilters({ searchValue, onSearchChange }) {
  return (
    <div className={styles.toolbar}>
      <div>
        <h2 className={styles.sectionTitle}>Global View</h2>
        <p className={styles.sectionNote}>
          Read-only template for corporation-wide insights.
        </p>
      </div>

      <label className={styles.searchLabel}>
        Find Corporation
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by corporation name"
          className={styles.searchInput}
        />
      </label>
    </div>
  );
}

export default ViewFilters;
