import styles from './CorpDetailsSummaryView.module.css';

function CorpDetailsSummaryView({ corpName }) {
  return (
    <div className={styles.summaryContainer}>
      <h3>Summary</h3>
      <p>
        Summary content for <strong>{corpName}</strong> can be added here.
      </p>
    </div>
  );
}

export default CorpDetailsSummaryView;
