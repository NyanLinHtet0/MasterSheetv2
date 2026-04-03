import styles from './corp_list.module.css';
import AddCorpForm from './add_corp_form';

// Accept onAddCorp prop
function CorpList({ showAddCorpForm, setShowAddCorpForm, corps = [], onAddCorp }) {
    return (
        <div className={styles.corpList}>
            <div className={styles.corpListHeader}>
                <h2>Corporations</h2>
                <button onClick={() => setShowAddCorpForm(true)}>Add</button>
            </div>

            {showAddCorpForm && (
                <AddCorpForm 
                    onAdd={(data) => {
                        // Pass form data back up the chain to the Dirty Map
                        onAddCorp(data); 
                        setShowAddCorpForm(false); 
                    }} 
                    onCancel={() => setShowAddCorpForm(false)} 
                />
            )}

            {/* UNCOMMENTED: You will now see your new corps appear instantly! */}
            <div style={{ marginTop: '15px' }}>
                {corps.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {corps.map((corp) => (
                            <li 
                                key={corp.id} 
                                style={{ 
                                    padding: '16px 10px', 
                                    borderBottom: '1px solid #f1f5f9', 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <strong style={{ fontSize: '18px', color: '#334155' }}>
                                    {corp.name}
                                </strong>
                                <span style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                                    Balance: {Number(corp.current_balance).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ padding: '15px', color: '#94a3b8', fontStyle: 'italic' }}>
                        No corporations found in database.
                    </p>
                )}
            </div>
        </div>
    );
}

export default CorpList;