import { useMemo, useState } from 'react';
import ViewFilters from '../view/ViewFilters';
import ViewSummaryCards from '../view/ViewSummaryCards';
import ViewTable from '../view/ViewTable';
import {
  buildViewMetrics,
  filterCorpSummaries,
  summarizeCorps,
} from '../view/viewHelpers';
import styles from '../view/view.module.css';

function View({ corps = [] }) {
  const [search, setSearch] = useState('');

  const corpSummaries = useMemo(() => summarizeCorps(corps), [corps]);
  const filteredRows = useMemo(
    () => filterCorpSummaries(corpSummaries, search),
    [corpSummaries, search]
  );
  const metrics = useMemo(() => buildViewMetrics(filteredRows), [filteredRows]);

  return (
    <section className={styles.page}>
      <ViewFilters searchValue={search} onSearchChange={setSearch} />
      <ViewSummaryCards metrics={metrics} />
      <ViewTable rows={filteredRows} />
    </section>
  );
}

export default View;
