import React, { useState, useEffect, useCallback, createContext } from "react";
import { Table } from "antd";
import EditableCell from "./editableCell";
import ResizeableTableHeader from "./resizeableTableHeader";

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

  const handleResize = (index) => (width) => {
    setColumns((cols) =>
      cols.map((col, i) => (index === i ? { ...col, width } : col))
    );
  };

  const nextColumns = columns.map((col, index) => {
    const nextCol = {
      ...col,
      //// To handle column resize, pass extra header props (column width and resize handler function)
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
      //// To handle editable columns, add render function to columns
      render: col.editable
        ? (_, row) => <EditableCell column={col} row={row} />
        : col.render,
    };
    return nextCol;
  });

  const components = {
    header: {
      cell: ResizeableTableHeader,
    },
  };

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
        components={components}
        className="editable-table"
        columns={nextColumns}
        dataSource={dataSource}
        pagination={false}
        scroll={{}}
      />
    </EditableTableContext.Provider>
  );
};

export default EditableTableBody;
