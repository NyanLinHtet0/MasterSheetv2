import styles from './CorpDetailsSummaryView.module.css';
import { useState } from 'react';
import SummaryRow from '../sheets/SummaryView/profitview';

function CorpDetailsSummaryView({
  corpData,
  globalTree = [],
  localTree = [],
  inventoryTree = [],
  transactions = [],
  linkTable = [],
  paymentTable = [],
}) {
  const corpName = corpData?.name || 'Unknown corp';

  return (
    <>
      <h3>Summary</h3>
      <SummaryRow/>
    </>
  );
}

export default CorpDetailsSummaryView;
