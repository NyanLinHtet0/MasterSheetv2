import React, { useState } from 'react';
import currency from 'currency.js';
import styles from './add_corp_form.module.css';

function AddCorpForm({ onAdd, onCancel }) {
    const [newCorpName, setNewCorpName] = useState('');
    // State holds the raw string as the user types (e.g. "1500" or "-")
    const [newCorpBalance, setNewCorpBalance] = useState('');
    const [newCorpForeign, setNewCorpForeign] = useState('');

    // Derived state: checks if name ends with 'ဝယ်စာရင်း'
    const isForeign = newCorpName.includes('ဝယ်စာရင်း') || newCorpName.includes('currency');


    // Handle form submission and place values as much as possible in the correct format for the parent component
    const handleSubmit = (e) => {
        e.preventDefault();
        const balance = currency(newCorpBalance || 0, { precision: 4 });
        const foreign = currency(newCorpForeign || 0, { precision: 4 });
        const isInverse = newCorpName.includes('/i');
        const corpData = {
            name: newCorpName.replace('/i', '').trim(),
            current_balance: isInverse ? balance.multiply(-1).value : balance.value,
            current_foreign: isForeign
            ? (isInverse ? foreign.multiply(-1).value : foreign.value)
            : null,
            is_foreign: isForeign ? 1 : 0,
            inverse: isInverse ? 1 : 0,
            last_verified_date: null,
            last_verified_balance: null,
            last_verified_total_foreign: null,
            order: 0,
            is_deleted: 0,  
        };

        onAdd(corpData); // Pass the data back up to the parent
        resetForm();
    };

    const resetForm = () => {
        setNewCorpName('');
        setNewCorpBalance('');
        setNewCorpForeign('');
    };

    // only for DISPLAY
    const formatDisplayValue = (val, allowDecimal = false) => {
        if (val === '' || val === '-') return val;

        const num = Number(val);
        if (Number.isNaN(num)) return val;

        if (!allowDecimal) {
            return Math.trunc(num).toLocaleString();
        }

        const hasTrailingDot = val.endsWith('.');
        const decimalPart = val.includes('.') ? val.split('.')[1] : null;

        let formatted = num.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });

        if (hasTrailingDot) {
            formatted += '.';
        } else if (decimalPart !== null) {
            formatted =
                formatted.split('.')[0] +
                '.' +
                decimalPart.slice(0, 2);
        }

        return formatted;
    };

    // store RAW value only, no commas in state
    const handleInputChange = (e, setFunction, allowDecimal = false) => {
        const raw = e.target.value.replace(/,/g, '');

        const pattern = allowDecimal
            ? /^-?\d*(\.\d{0,2})?$/
            : /^-?\d*$/;

        if (raw === '' || raw === '-' || pattern.test(raw)) {
            setFunction(raw);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.corpFormWrapper} style={{ alignItems: 'center' }}>
                
                <div className={styles.inputFieldCont} style={{ flex: '1' }}>
                    <input
                        type="text"
                        placeholder="Corporation Name ('.../i' for inverse)"
                        required
                        value={newCorpName}
                        onChange={(e) => setNewCorpName(e.target.value)}
                    />
                </div>

                <div className={styles.inputFieldCont} style={{ flex: '1' }}>
                    <input
                        type="text"
                        placeholder={isForeign ? "Initial Kyat" : "Balance"}
                        value={isForeign ? formatDisplayValue(newCorpBalance,true) : formatDisplayValue(newCorpBalance,false)}
                        onChange={(e) => isForeign ? handleInputChange(e, setNewCorpBalance, true) : handleInputChange(e, setNewCorpBalance, false)}
                    />
                </div>

                {isForeign && (
                    <div className={styles.inputFieldCont} style={{ flex: '1' }}>
                        <input
                            type="text"
                            placeholder="Initial Baht"
                            value={formatDisplayValue(newCorpForeign, true)}
                            onChange={(e) => handleInputChange(e, setNewCorpForeign,true)}
                        />
                    </div>
                )}
            </div>
            
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default AddCorpForm;
