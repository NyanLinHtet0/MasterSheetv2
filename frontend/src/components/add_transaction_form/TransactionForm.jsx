// TransactionForm.jsx
import { useState, useEffect, useMemo, useRef } from 'react';
import styles from './TransactionForm.module.css';
import {
  calculateTransactionValues,
  cleanNumericInput,
  getDisplayedBaseTotal,
  isUsableNumberInput,
  isValidPartialNumber,
  parseEditableNumber,
} from '../transaction_table/transactionTableHelpers';
import {
  buildAssembledTree,
  buildLayerOptions,
} from '../helpers/treeViewHelpers';
import { buildTreeScope } from '../helpers/treeHelpers';
import { LANGUAGE_MODES } from '../helpers/nameLocalization';

import TransactionDateFields from './TransactionDateFields';
import TransactionTagFields from './TransactionTagFields';
import TransactionTextField from './TransactionTextField';
import TransactionNumberField from './TransactionNumberField';

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
  globalTree = [],
  localTree = [],
  languageMode = LANGUAGE_MODES.ENG,
  inventoryOptions = [],
}) {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [totalMMK, setTotalMMK] = useState('');
  const [layer1Key, setLayer1Key] = useState('');
  const [layer2Key, setLayer2Key] = useState('');
  const [layer3Key, setLayer3Key] = useState('');
  const [inventoryQuantity, setInventoryQuantity] = useState('');

  const dayInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  const isForeign =
    typeof isForeignProp === 'boolean'
      ? isForeignProp
      : Boolean(corpname && corpname.includes('ဝယ်စာရင်း'));

  const daysInSelectedMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1);

  const assembledTree = useMemo(
    () => buildAssembledTree(globalTree, localTree, { languageMode }),
    [globalTree, localTree, languageMode]
  );

  const layer1Options = useMemo(() => {
    return buildLayerOptions(assembledTree.childrenByKey, null);
  }, [assembledTree]);

  const revenueScope = useMemo(
    () =>
      buildTreeScope({
        globalTree,
        localTree,
        globalName: 'Revenue',
      }),
    [globalTree, localTree]
  );

  const expenseScope = useMemo(
    () =>
      buildTreeScope({
        globalTree,
        localTree,
        globalName: 'Expense',
      }),
    [globalTree, localTree]
  );

  const { revenueLayer1Key, expenseLayer1Key } = useMemo(() => {
    const findLayer1KeyForScope = (scope) => {
      if (!scope) return '';

      const hasScope =
        (scope.globalIdSet && scope.globalIdSet.size > 0) ||
        (scope.localIdSet && scope.localIdSet.size > 0);

      if (!hasScope) return '';

      const matchesNodeScope = (node) => {
        if (!node) return false;

        const matchesGlobal =
          scope.globalIdSet?.size > 0 && node.globalId != null
            ? scope.globalIdSet.has(node.globalId)
            : false;

        const matchesLocal =
          scope.localIdSet?.size > 0 && node.localId != null
            ? scope.localIdSet.has(node.localId)
            : false;

        return matchesGlobal || matchesLocal;
      };

      for (const option of layer1Options) {
        const stack = [option.key];
        const visited = new Set();

        while (stack.length > 0) {
          const key = stack.pop();
          if (visited.has(key)) continue;
          visited.add(key);

          const node = assembledTree.nodeMap.get(key);
          if (matchesNodeScope(node)) {
            return option.key;
          }

          const children = assembledTree.childrenByKey.get(key) || [];
          children.forEach((child) => stack.push(child.key));
        }
      }

      return '';
    };

    return {
      revenueLayer1Key: findLayer1KeyForScope(revenueScope),
      expenseLayer1Key: findLayer1KeyForScope(expenseScope),
    };
  }, [layer1Options, assembledTree, revenueScope, expenseScope]);

  const layer2Options = useMemo(() => {
    if (!layer1Key) return [];
    return buildLayerOptions(assembledTree.childrenByKey, layer1Key);
  }, [assembledTree, layer1Key]);

  const layer3Options = useMemo(() => {
    if (!layer2Key) return [];

    const directChildren = assembledTree.childrenByKey.get(layer2Key) || [];
    const collectedLocalNodes = directChildren.filter(
      (child) => child.source === 'local'
    );

    const dedupedLocalOptions = Array.from(
      new Map(collectedLocalNodes.map((node) => [node.key, node])).values()
    );

    if (dedupedLocalOptions.length > 0) {
      return dedupedLocalOptions.map((node) => ({
        key: node.key,
        label: node.label,
      }));
    }

    return buildLayerOptions(assembledTree.childrenByKey, layer2Key);
  }, [assembledTree, layer2Key]);

  const deepestSelectionKey = layer3Key || layer2Key || layer1Key;
  const selectedTagNode = useMemo(
    () => assembledTree.nodeMap.get(deepestSelectionKey) || null,
    [assembledTree, deepestSelectionKey]
  );

  const matchedInventoryOption = useMemo(() => {
    if (!selectedTagNode) return null;

    const normalizeName = (value) =>
      String(value || '')
        .trim()
        .toLowerCase();

    const selectedName = normalizeName(selectedTagNode.label || selectedTagNode.name);
    if (!selectedName) return null;

    return (
      inventoryOptions.find((option) => {
        const inventoryLeafName = normalizeName(
          option.leafName || option.label?.split(' > ').at(-1)
        );
        return inventoryLeafName === selectedName;
      }) || null
    );
  }, [inventoryOptions, selectedTagNode]);

  const hasInventoryMatch = Boolean(selectedTagNode?.localId != null && matchedInventoryOption);

  useEffect(() => {
    if (day > daysInSelectedMonth) {
      setDay(daysInSelectedMonth);
    }
  }, [year, month, day, daysInSelectedMonth]);

  const getAutoInventoryFlow = (rawAmount) => {
    if (!hasInventoryMatch) return '';
    const numericAmount = parseEditableNumber(rawAmount, null);
    if (numericAmount == null || numericAmount === 0) return '';
    return numericAmount > 0 ? '-1' : '1';
  };

  const inventoryItemId = hasInventoryMatch ? String(matchedInventoryOption.value) : '';
  const inventoryFlow = hasInventoryMatch ? getAutoInventoryFlow(amount) : '';

  const syncForeignTotal = (nextAmount, nextRate) => {
    if (!isForeign) return;

    const baseTotal = getDisplayedBaseTotal({
      amount: nextAmount,
      rate: nextRate,
      isForeign,
    });

    setTotalMMK(baseTotal == null ? '' : String(baseTotal));
  };

  const autoSelectLayer1ByTotal = (rawTotalValue) => {
    const numericTotal = parseEditableNumber(rawTotalValue, null);
    if (numericTotal == null || numericTotal === 0) return;

    const nextAutoLayer1 = numericTotal < 0 ? expenseLayer1Key : revenueLayer1Key;
    if (!nextAutoLayer1 || nextAutoLayer1 === layer1Key) return;

    setLayer1Key(nextAutoLayer1);
    setLayer2Key('');
    setLayer3Key('');
  };

  const handleAmountChange = (e) => {
    const rawValue = cleanNumericInput(e.target.value);
    if (!isValidPartialNumber(rawValue)) return;

    setAmount(rawValue);
    syncForeignTotal(rawValue, rate);

    const autoTotal = isForeign
      ? getDisplayedBaseTotal({
          amount: rawValue,
          rate,
          isForeign,
        })
      : parseEditableNumber(rawValue, null);

    autoSelectLayer1ByTotal(autoTotal);
  };

  const handleRateChange = (e) => {
    const rawValue = cleanNumericInput(e.target.value);
    if (!isValidPartialNumber(rawValue)) return;

    setRate(rawValue);
    syncForeignTotal(amount, rawValue);

    const autoTotal = getDisplayedBaseTotal({
      amount,
      rate: rawValue,
      isForeign,
    });

    autoSelectLayer1ByTotal(autoTotal);
  };

  const handleTotalChange = (e) => {
    const rawValue = cleanNumericInput(e.target.value);
    if (!isValidPartialNumber(rawValue)) return;

    setTotalMMK(rawValue);
    autoSelectLayer1ByTotal(rawValue);
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setRate('');
    setTotalMMK('');
    setLayer1Key('');
    setLayer2Key('');
    setLayer3Key('');
    setInventoryQuantity('');
  };

  const processSubmit = (isShiftEnter) => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) return;
    if (!isUsableNumberInput(amount)) return;
    if (isForeign && !isUsableNumberInput(rate)) return;
    if (!layer1Key) return;

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

    if (hasInventoryMatch && !isUsableNumberInput(inventoryQuantity)) return;

    const txData = {
      tx_date,
      description: trimmedDescription,
      amount: calculated.amount,
      adjustment: calculated.adjustment,
      total_mmk: calculated.total_mmk,
      soft_delete: 0,
      tx_status: 1,
      global_tree_id: selectedTagNode?.globalId ?? null,
      local_tree_id: selectedTagNode?.localId ?? null,
      inven_id: hasInventoryMatch && inventoryItemId !== '' ? Number(inventoryItemId) : null,
      inven_flow: hasInventoryMatch && inventoryFlow !== '' ? Number(inventoryFlow) : null,
      inven_qty:
        !hasInventoryMatch || inventoryQuantity === '' || !isUsableNumberInput(inventoryQuantity)
          ? null
          : parseEditableNumber(inventoryQuantity, null),
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
        <TransactionDateFields
          styles={styles}
          year={year}
          month={month}
          day={day}
          years={years}
          months={months}
          days={days}
          dayInputRef={dayInputRef}
          onYearChange={setYear}
          onMonthChange={setMonth}
          onDayChange={setDay}
        />

        <TransactionTextField
          ref={descriptionInputRef}
          className={styles.textInput}
          placeholder="Description"
          value={description}
          onChange={setDescription}
          required
        />

        <TransactionNumberField
          className={styles.amountInput}
          placeholder="Amount"
          value={formatDisplayValue(amount)}
          onChange={handleAmountChange}
          required
        />

        {isForeign ? (
          <>
            <div className={styles.singleFieldRow}>
              <TransactionNumberField
                className={styles.fullWidthInput}
                placeholder="Rate"
                value={formatDisplayValue(rate)}
                onChange={handleRateChange}
                required
              />
            </div>

            <div className={styles.singleFieldRow}>
              <TransactionNumberField
                className={styles.fullWidthInput}
                placeholder="Total MMK"
                value={formatDisplayValue(totalMMK)}
                onChange={handleTotalChange}
                required
              />
            </div>

            <div className={styles.singleFieldRow}>
              <TransactionTagFields
                styles={styles}
                layer1Key={layer1Key}
                layer2Key={layer2Key}
                layer3Key={layer3Key}
                layer1Options={layer1Options}
                layer2Options={layer2Options}
                layer3Options={layer3Options}
                onLayer1Change={(value) => {
                  setLayer1Key(value);
                  setLayer2Key('');
                  setLayer3Key('');
                  setInventoryQuantity('');
                }}
                onLayer2Change={(value) => {
                  setLayer2Key(value);
                  setLayer3Key('');
                  setInventoryQuantity('');
                }}
                onLayer3Change={(value) => {
                  setLayer3Key(value);
                  setInventoryQuantity('');
                }}
              />
            </div>
          </>
        ) : (
          <div className={styles.singleFieldRow}>
            <TransactionTagFields
              styles={styles}
              layer1Key={layer1Key}
              layer2Key={layer2Key}
              layer3Key={layer3Key}
              layer1Options={layer1Options}
              layer2Options={layer2Options}
              layer3Options={layer3Options}
              onLayer1Change={(value) => {
                setLayer1Key(value);
                setLayer2Key('');
                setLayer3Key('');
                setInventoryQuantity('');
              }}
              onLayer2Change={(value) => {
                setLayer2Key(value);
                setLayer3Key('');
                setInventoryQuantity('');
              }}
              onLayer3Change={(value) => {
                setLayer3Key(value);
                setInventoryQuantity('');
              }}
            />
          </div>
        )}

        {hasInventoryMatch && (
          <div className={styles.singleFieldRow}>
            <div className={styles.tagFields}>
              <input
                className={styles.tagSelect}
                value={`Item Tag: ${matchedInventoryOption.label} (ID ${matchedInventoryOption.value})`}
                readOnly
                title={matchedInventoryOption.label}
              />

              <select className={styles.tagSelect} value={inventoryFlow} disabled>
                <option value="">Item In/Out</option>
                <option value="1">In</option>
                <option value="-1">Out</option>
              </select>

              <TransactionNumberField
                className={styles.tagSelect}
                placeholder="Item Quantity"
                value={formatDisplayValue(inventoryQuantity)}
                onChange={(e) => {
                  const rawValue = cleanNumericInput(e.target.value);
                  if (!isValidPartialNumber(rawValue)) return;
                  setInventoryQuantity(rawValue);
                }}
                required
              />
            </div>
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>
          Add Transaction
        </button>
      </form>
    </div>
  );
}
