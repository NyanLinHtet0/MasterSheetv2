import { useState } from 'react';
import {
  buildEditFormData,
  cleanNumericInput,
  getDisplayedBaseTotal,
  isValidPartialNumber,
} from './transactionTableHelpers';

export function useTransactionTable({ isForeign, isInverse, onSaveRow, resolveTypeId }) {
  const [isTableEditMode, setIsTableEditMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    date: '',
    description: '',
    amount: '',
    rate: '',
    total_mmk: '',
    type_id: '',
    global_tree_id: '',
    local_tree_id: '',
  });

  const handleEditClick = (tx) => {
    setEditingRowId(tx.id);
    setEditFormData(buildEditFormData(tx, { isForeign, isInverse, resolveTypeId }));
  };

  const handleSaveEdit = (rowId) => {
    if (!editFormData.type_id || !editFormData.global_tree_id) {
      alert('Please select Type and Global Tag before saving.');
      return;
    }

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

      if (field === 'type_id') {
        next.global_tree_id = '';
        next.local_tree_id = '';
      }

      if (field === 'global_tree_id') {
        if (typeof rawValue === 'string' && rawValue.startsWith('l:')) {
          const [, localIdPart, globalIdPart] = rawValue.split(':');
          next.global_tree_id = globalIdPart || '';
          next.local_tree_id = localIdPart || '';
        } else if (typeof rawValue === 'string' && rawValue.startsWith('g:')) {
          const [, globalIdPart] = rawValue.split(':');
          next.global_tree_id = globalIdPart || '';
          next.local_tree_id = '';
        } else {
          next.local_tree_id = '';
        }
      }

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
