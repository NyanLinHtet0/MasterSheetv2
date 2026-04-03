import React, { useState } from 'react';
import styles from './Sheets.module.css';
import CorpList from '../sheets/corp_list';
import CorpDetails from '../sheets/corp_details';

// 1. Accept the 'corps' prop that App.jsx is sending
function Sheets({ corps, onAddCorp }) {
    const [showAddCorpForm, setShowAddCorpForm] = useState(false);

    return (
        <div className={styles.container}>
            <CorpList 
                showAddCorpForm={showAddCorpForm} 
                setShowAddCorpForm={setShowAddCorpForm} 
                corps={corps} // 2. Pass the database rows down to CorpList
                onAddCorp={onAddCorp}
            />
            <CorpDetails />
        </div>
    );
}

export default Sheets;