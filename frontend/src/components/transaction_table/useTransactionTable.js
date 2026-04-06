import { useState } from 'react';
import {
  buildEditFormData,
  cleanNumericInput,
  getDisplayedBaseTotal,
  isValidPartialNumber,
} from './transactionTableHelpers';

export function useTransactionTable({ isForeign, isInverse, onSaveRow }) {
  const [isTableEditMode, setIsTableEditMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    date: '',
    description: '',
    amount: '',
    rate: '',
    total_mmk: '',
  });

  const handleEditClick = (tx) => {
    setEditingRowId(tx.id);
    setEditFormData(buildEditFormData(tx, { isForeign, isInverse }));
  };

  const handleSaveEdit = (rowId) => {
    onSaveRow(rowId, editFormData);
    setEditingRowId(null);
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
  };

  const handleInputChange = (e, field) => {
    const rawValue = cleanNumericInput(e.target.value);

    if (['amount', 'rate', 'total_mmk'].includes(field) && !isValidPartialNumber(rawValue)) {
      return;
    }

    setEditFormData((prev) => {
      const next = {
        ...prev,
        [field]: rawValue,
      };

      if (isForeign && (field === 'amount' || field === 'rate')) {
        const nextBaseTotal = getDisplayedBaseTotal({
          amount: field === 'amount' ? rawValue : next.amount,
          rate: field === 'rate' ? rawValue : next.rate,
          isForeign,
        });

        next.total_mmk = nextBaseTotal == null ? '' : String(nextBaseTotal);
      }

      return next;
    });
  };

  const handleToggleEditMode = () => {
    setIsTableEditMode((prev) => !prev);
    setEditingRowId(null);
  };

  return {
    isTableEditMode,
    editingRowId,
    editFormData,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleInputChange,
    handleToggleEditMode,
  };
}
