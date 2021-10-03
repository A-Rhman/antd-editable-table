import React, { useContext } from "react";
import { Form } from "antd";
import CheckboxViewCell from "./checkboxViewCell";
import CheckboxEditCell from "./checkboxEditCell";
import { EditableTableContext } from "./editableTableBody";

const CheckboxCell = ({
  itemProps,
  focused,
  editing,
  onClick,
  columnKey,
  disabled,
  rowKey,
}) => {
  const { dataKey } = useContext(EditableTableContext);
  return (
    <Form.Item
      name={[dataKey, rowKey, columnKey]}
      noStyle
      valuePropName="checked"
    >
      {editing ? (
        <CheckboxEditCell {...itemProps} />
      ) : (
        <CheckboxViewCell
          onClick={onClick}
          focused={focused}
          disabled={disabled}
        />
      )}
    </Form.Item>
  );
};

export default CheckboxCell;
