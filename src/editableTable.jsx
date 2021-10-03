import React, { useState, useEffect, useCallback, createContext } from 'react';
import { Table } from 'antd';
import InputCell from './inputCell';
import CheckboxCell from './checkboxCell';
export const EditableTableContext = createContext(null);

const EditableTable = ({ dataSource, columns }) => {
  const [focusedCell, setFocusedCell] = useState([columns[0].key, 2]);
  const [editingCell, setEditingCell] = useState([]);

  const moveFocus = useCallback(
    (direction) => {
      if (direction === 'up' || direction === 'down') {
        setFocusedCell((fc) => {
          const rowIndex = dataSource.findIndex((row) => row.key === fc[1]);
          const nextRowIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1;
          const nextRow =
            typeof rowIndex === 'number' ? dataSource[nextRowIndex] : null;
          return nextRow ? [fc[0], nextRow?.key] : fc;
        });
      } else if (direction === 'left' || direction === 'right') {
        setFocusedCell((fc) => {
          const colIndex = columns.findIndex((col) => col.key === fc[0]);
          const nextColumnIndex =
            direction === 'right' ? colIndex + 1 : colIndex - 1;
          const nextColumn =
            typeof colIndex === 'number' ? columns[nextColumnIndex] : null;
          return nextColumn && nextColumn.editable
            ? [nextColumn?.key, fc[1]]
            : fc;
        });
      }
    },
    [setFocusedCell]
  );
  const handleKeyDown = useCallback((e) => {
    switch (e.keyCode) {
      case 38:
        moveFocus('up');
        break;
      case 40:
        moveFocus('down');
        break;
      case 37:
        moveFocus('left');
        break;
      case 39:
        moveFocus('right');
        break;
      case 13:
        // enter
        startEditing();
        break;
    }
  });
  const startEditing = () => setEditingCell(focusedCell);
  const stopEditing = () => setEditingCell([]);

  useEffect(() => {
    console.log(focusedCell);
  }, [focusedCell]);

  const getRenderFunction = (col, row) => {
    const columnKey = col.key;
    const rowKey = row.key;
    const { type, props: itemProps } = col.editable;
    const cellProps = {
      focused: focusedCell[0] === columnKey && focusedCell[1] === rowKey,
      editing: editingCell[0] === columnKey && editingCell[1] === rowKey,
      itemProps,
      onClick: () => setFocusedCell([columnKey, rowKey]),
      columnKey,
      rowKey,
    };

    if (type === 'string') {
      return <InputCell {...cellProps} />;
    }
    if (type === 'checkbox') {
      return <CheckboxCell {...cellProps} />;
    }
  };

  const nextColumns = columns.map((col) =>
    !col.editable
      ? col
      : {
          ...col,
          render: (_, row) => getRenderFunction(col, row),
        }
  );

  return (
    <EditableTableContext.Provider
      value={{ moveFocus, handleKeyDown, startEditing, stopEditing }}
    >
      <Table columns={nextColumns} dataSource={dataSource} />
    </EditableTableContext.Provider>
  );
};

export default EditableTable;
