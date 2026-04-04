import { useState } from 'react';
import { buildEditFormData } from './transactionTableHelpers';

export function useTransactionTable({ isForeign, isInverse, onSaveRow }) {
  const [isTableEditMode, setIsTableEditMode] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  const [editFormData, setEditFormData] = useState({
    date: '',
    description: '',
    amount: '',
    rate: '',
    total_mmk: '',
  });

  const handleEditClick = (tx) => {
    setEditingRowIndex(tx.originalIndex);
    setEditFormData(
      buildEditFormData(tx, { isForeign, isInverse })
    );
  };

  const handleSaveEdit = (originalIndex) => {
    onSaveRow(originalIndex, editFormData);
    setEditingRowIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingRowIndex(null);
  };

  const handleInputChange = (e, field) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleToggleEditMode = () => {
    setIsTableEditMode((prev) => !prev);
    setEditingRowIndex(null);
  };

  return {
    isTableEditMode,
    editingRowIndex,
    editFormData,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleInputChange,
    handleToggleEditMode,
  };
}