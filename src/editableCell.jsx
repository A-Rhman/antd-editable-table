import React, { useContext } from "react";
import NumberCell from "./numberCell";
import InputCell from "./inputCell";
import CheckboxCell from "./checkboxCell";
import SelectCell from "./selectCell";
import { EditableTableContext } from "./editableTableBody";

const EditableCell = ({ column, row }) => {
  const { focusedCell, editingCell, setFocusedCell, startEditing } =
    useContext(EditableTableContext);

  const columnKey = column.key;
  const rowKey = row.key;
  const editable =
    typeof column.editable === "function"
      ? column.editable(row)
      : column.editable;
  const { type, onFilter, disabled, options, props: itemProps } = editable;
  const focused = focusedCell[0] === columnKey && focusedCell[1] === rowKey;
  const editing = editingCell[0] === columnKey && editingCell[1] === rowKey;
  const onClick = () => {
    if (focused && !editing && disabled !== true) {
      startEditing();
    } else {
      setFocusedCell([columnKey, rowKey]);
    }
  };
  const cellProps = {
    focused,
    editing,
    itemProps,
    onClick,
    disabled,
    columnKey,
    rowKey,
  };
  if (type === "string") {
    return <InputCell {...cellProps} />;
  }
  if (type === "number") {
    return <NumberCell {...cellProps} />;
  }
  if (type === "checkbox") {
    return <CheckboxCell {...cellProps} />;
  }
  if (type === "select") {
    return <SelectCell {...{ ...cellProps, options, onFilter }} />;
  }
};

export default EditableCell;
