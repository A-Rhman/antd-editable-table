import React, { useContext } from "react";
import { Form } from "antd";
import SelectViewCell from "./selectViewCell";
import SelectEditCell from "./selectEditCell";
import { EditableTableContext } from "./editableTableBody";

const SelectCell = ({
  itemProps,
  focused,
  editing,
  onClick,
  columnKey,
  disabled,
  rowKey,
  onFilter,
  options,
}) => {
  const { dataKey } = useContext(EditableTableContext);
  return (
    <Form.Item name={[dataKey, rowKey, columnKey]} noStyle>
      {editing ? (
        <SelectEditCell {...{ ...itemProps, options, rowKey, onFilter }} />
      ) : (
        <SelectViewCell {...{ options, rowKey, onClick, focused, disabled }} />
      )}
    </Form.Item>
  );
};

export default SelectCell;
