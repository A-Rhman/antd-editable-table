import React, { useState, useEffect, useCallback, createContext } from "react";
import { Table } from "antd";
import EditableCell from "./editableCell";

export const EditableTableContext = createContext(null);

const EditableTableBody = ({
  dataSource,
  dataKey,
  columns: cols,
  defaultSelected,
  onAddRow,
}) => {
  const initialFocusedCell = defaultSelected || [columns[0].key, 0];
  const [columns, setColumns] = useState([]);
  const [focusedCell, setFocusedCell] = useState(initialFocusedCell);
  const [editingCell, setEditingCell] = useState([]);
  const startEditing = () => {
    if (focusedCell[1] >= dataSource.length - 1) {
      onAddRow();
    }
    setEditingCell(focusedCell);
  };
  const stopEditing = () => setEditingCell([]);

  useEffect(() => {
    setColumns(cols);
  }, [cols]);

  const moveFocus = useCallback(
    (direction) => {
      if (direction === "up" || direction === "down") {
        setFocusedCell((fc) => {
          const rowIndex = dataSource.findIndex((row) => row.key === fc[1]);
          const nextRowIndex = direction === "up" ? rowIndex - 1 : rowIndex + 1;
          const nextRow =
            typeof rowIndex === "number" ? dataSource[nextRowIndex] : null;
          return nextRow ? [fc[0], nextRow?.key] : fc;
        });
      } else if (direction === "left" || direction === "right") {
        setFocusedCell((fc) => {
          const colIndex = columns.findIndex((col) => col.key === fc[0]);
          const nextColumnIndex =
            direction === "right" ? colIndex + 1 : colIndex - 1;
          const nextColumn =
            typeof colIndex === "number" ? columns[nextColumnIndex] : null;
          return nextColumn && nextColumn.editable
            ? [nextColumn?.key, fc[1]]
            : fc;
        });
      }
      const el = document.querySelector(".cell-focused");
      if (el !== null) {
        if (el.scrollIntoViewIfNeeded) el.scrollIntoViewIfNeeded(true);
        else if (el.scrollIntoView) el.scrollIntoView(true);
      }
    },
    [setFocusedCell, dataSource]
  );

  const nextColumns = columns.map((col) => {
    const nextCol = {
      ...col,
      render: col.editable
        ? (_, row) => <EditableCell column={col} row={row} />
        : col.render,
    };
    return nextCol;
  });

  return (
    <EditableTableContext.Provider
      value={{
        dataKey,
        moveFocus,
        startEditing,
        stopEditing,
        setFocusedCell,
        focusedCell,
        editingCell,
      }}
    >
      <Table
        className="editable-table"
        columns={nextColumns}
        dataSource={dataSource}
        pagination={false}
      />
    </EditableTableContext.Provider>
  );
};

export default EditableTableBody;
