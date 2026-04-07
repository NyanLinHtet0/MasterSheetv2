import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ isDirty, onSave, onCancel }) {
  const location = useLocation();
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link to="/" className={location.pathname === '/' ? `${styles.link} ${styles.activeLink}` : styles.link}>Home</Link>
        <Link to="/Sheets" className={location.pathname === '/Sheets' ? `${styles.link} ${styles.activeLink}` : styles.link}>Sheets</Link>
        <Link to="/View" className={location.pathname === '/View' ? `${styles.link} ${styles.activeLink}` : styles.link}>View</Link>
      </div>

      {/* Renders Div Block Conditionally Once Modified */}
      {isDirty && (
        <div className={styles.actionContainer}>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancel</button>
          <button onClick={onSave} className={styles.saveBtn}>Save Changes</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
