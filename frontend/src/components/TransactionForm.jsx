import { useState, useEffect, useRef } from 'react';
import styles from './TransactionForm.module.css';
import {
  calculateTransactionValues,
  cleanNumericInput,
  getDisplayedBaseTotal,
  isUsableNumberInput,
  isValidPartialNumber,
  parseEditableNumber,
} from './transaction_table/transactionTableHelpers';

const today = new Date();
const years = Array.from({ length: 3 }, (_, i) => today.getFullYear() - 1 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const formatDisplayValue = (value) => {
  if (value === '' || value === '-' || value === '.' || value === '-.') return value;

  const [integerPart, decimalPart] = String(value).split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart != null ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export default function TransactionForm({
  onSubmit,
  corpname = '',
  isForeign: isForeignProp,
}) {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [totalMMK, setTotalMMK] = useState('');

  const dayInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const isForeign =
    typeof isForeignProp === 'boolean'
      ? isForeignProp
      : Boolean(corpname && corpname.includes('ဝယ်စာရင်း'));

  const daysInSelectedMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (day > daysInSelectedMonth) {
      setDay(daysInSelectedMonth);
    }
  }, [year, month, day, daysInSelectedMonth]);

  const syncForeignTotal = (nextAmount, nextRate) => {
    if (!isForeign) return;

    const baseTotal = getDisplayedBaseTotal({
      amount: nextAmount,
      rate: nextRate,
      isForeign,
    });

    setTotalMMK(baseTotal == null ? '' : String(baseTotal));
  };

  const handleAmountChange = (e) => {
    const rawValue = cleanNumericInput(e.target.value);
    if (!isValidPartialNumber(rawValue)) return;

    setAmount(rawValue);
    syncForeignTotal(rawValue, rate);
  };

  const handleRateChange = (e) => {
    const rawValue = cleanNumericInput(e.target.value);
    if (!isValidPartialNumber(rawValue)) return;

    setRate(rawValue);
    syncForeignTotal(amount, rawValue);
  };

  const handleTotalChange = (e) => {
    const rawValue = cleanNumericInput(e.target.value);
    if (!isValidPartialNumber(rawValue)) return;

    setTotalMMK(rawValue);
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setRate('');
    setTotalMMK('');
  };

  const processSubmit = (isShiftEnter) => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) return;
    if (!isUsableNumberInput(amount)) return;
    if (isForeign && !isUsableNumberInput(rate)) return;

    const tx_date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const calculated = calculateTransactionValues(
      {
        amount: parseEditableNumber(amount, 0),
        rate: isForeign ? parseEditableNumber(rate, 0) : 0,
        manualTotal:
          isForeign && isUsableNumberInput(totalMMK)
            ? parseEditableNumber(totalMMK, 0)
            : undefined,
      },
      { isForeign }
    );

    const txData = {
      tx_date,
      description: trimmedDescription,
      amount: calculated.amount,
      adjustment: calculated.adjustment,
      total_mmk: calculated.total_mmk,
      soft_delete: 0,
      tx_status: 1,
      ...(isForeign && {
        rate: calculated.rate,
      }),
    };

    onSubmit(txData);
    resetForm();

    if (isShiftEnter) {
      const nextDate = new Date(year, month - 1, day + 1);
      setYear(nextDate.getFullYear());
      setMonth(nextDate.getMonth() + 1);
      setDay(nextDate.getDate());
      descriptionInputRef.current?.focus();
    } else {
      dayInputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processSubmit(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      processSubmit(true);
    }
  };

  return (
    <div className={styles.transactionFormWrapper}>
      <h3 className={styles.formTitle}></h3>

      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className={styles.formContainer}
      >
        <div className={styles.inputRow}>
          <div className={styles.inputDatefields}>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className={styles.flexInput}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className={styles.flexInput}
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {new Date(2000, m - 1).toLocaleString('default', { month: 'short' })}
                </option>
              ))}
            </select>

            <select
              ref={dayInputRef}
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className={styles.flexInput}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <input
            ref={descriptionInputRef}
            style={{ flex: 2 }}
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            style={{ flex: 0.8 }}
            type="text"
            placeholder="Amount"
            value={formatDisplayValue(amount)}
            onChange={handleAmountChange}
            required
          />

          {isForeign && (
            <>
              <input
                style={{ flex: 0.6 }}
                type="text"
                placeholder="Rate"
                value={formatDisplayValue(rate)}
                onChange={handleRateChange}
                required
              />

              <input
                style={{ flex: 1, fontWeight: 'bold' }}
                type="text"
                placeholder="Total MMK"
                value={formatDisplayValue(totalMMK)}
                onChange={handleTotalChange}
                required
              />
            </>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add Transaction
        </button>
      </form>
    </div>
  );
}
