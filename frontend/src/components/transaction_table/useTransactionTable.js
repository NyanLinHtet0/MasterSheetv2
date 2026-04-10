import { useCallback, useEffect, useRef, useState } from 'react';
import {
  buildEditFormData,
  cleanNumericInput,
  getDisplayedBaseTotal,
  isValidPartialNumber,
} from './transactionTableHelpers';

export function useTransactionTable({ isForeign, isInverse, onSaveRow, resolveTypeId }) {
  const [isTableEditMode, setIsTableEditMode] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    rowId: null,
    x: 0,
    y: 0,
  });

  const editingRowRef = useRef(null);
  const contextMenuRef = useRef(null);

  const [editFormData, setEditFormData] = useState({
    date: '',
    description: '',
    amount: '',
    rate: '',
    total_mmk: '',
    type_id: '',
    global_tree_id: '',
    local_tree_id: '',
    inven_id: '',
    inven_flow: '',
    inven_qty: '',
  });

  const closeContextMenu = useCallback(() => {
    setContextMenu({
      isOpen: false,
      rowId: null,
      x: 0,
      y: 0,
    });
  }, []);

  const handleEditClick = useCallback((tx) => {
    closeContextMenu();
    setEditingRowId(tx.id);
    setEditFormData(buildEditFormData(tx, { isForeign, isInverse, resolveTypeId }));
  }, [closeContextMenu, isForeign, isInverse, resolveTypeId]);

  const handleSaveEdit = useCallback((rowId) => {
    if (!editFormData.type_id || !editFormData.global_tree_id) {
      alert('Please select Type and Global Tag before saving.');
      return;
    }

    onSaveRow(rowId, editFormData);
    setEditingRowId(null);
  }, [editFormData, onSaveRow]);

  const handleCancelEdit = useCallback(() => {
    setEditingRowId(null);
  }, []);

  const handleInputChange = (e, field) => {
    const rawValue = cleanNumericInput(e.target.value);

    if (['amount', 'rate', 'total_mmk', 'inven_qty'].includes(field) && !isValidPartialNumber(rawValue)) {
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

      if (field === 'inven_id' && rawValue === '') {
        next.inven_flow = '';
        next.inven_qty = '';
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

  const handleToggleEditMode = useCallback(() => {
    setIsTableEditMode((prev) => !prev);
    setEditingRowId(null);
    closeContextMenu();
  }, [closeContextMenu]);

  const handleOpenContextMenu = useCallback((e, rowId) => {
    if (!isTableEditMode || editingRowId != null) return;

    e.preventDefault();

    setContextMenu({
      isOpen: true,
      rowId,
      x: e.clientX,
      y: e.clientY,
    });
  }, [editingRowId, isTableEditMode]);

  const handleKeyDown = useCallback((e) => {
    if (editingRowId == null) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      const tagName = e.target?.tagName?.toLowerCase();
      const isTextArea = tagName === 'textarea';
      const isButton = tagName === 'button';

      if (isTextArea || isButton) return;

      e.preventDefault();
      handleSaveEdit(editingRowId);
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  }, [editingRowId, handleCancelEdit, handleSaveEdit]);

  useEffect(() => {
    if (!contextMenu.isOpen) return;

    const handlePointerDown = (e) => {
      if (contextMenuRef.current?.contains(e.target)) {
        return;
      }

      closeContextMenu();
    };

    const handleWindowBlur = () => {
      closeContextMenu();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [closeContextMenu, contextMenu.isOpen]);

  useEffect(() => {
    if (editingRowId == null) return;

    const handlePointerDown = (e) => {
      if (!editingRowRef.current) return;
      if (editingRowRef.current.contains(e.target)) return;

      handleCancelEdit();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [editingRowId, handleCancelEdit]);

  return {
    isTableEditMode,
    editingRowId,
    editFormData,
    contextMenu,
    contextMenuRef,
    editingRowRef,
    closeContextMenu,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit,
    handleInputChange,
    handleToggleEditMode,
    handleOpenContextMenu,
    handleKeyDown,
  };
}
