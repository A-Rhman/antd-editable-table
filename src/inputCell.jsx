import React, { useContext } from "react";
import { Form } from "antd";
import InputViewCell from "./inputViewCell";
import InputEditCell from "./inputEditCell";
import { EditableTableContext } from "./editableTableBody";

const InputCell = ({
  itemProps,
  focused,
  disabled,
  editing,
  onClick,
  columnKey,
  rowKey,
}) => {
  const { dataKey } = useContext(EditableTableContext);
  return (
    <Form.Item name={[dataKey, rowKey, columnKey]} noStyle>
      {editing ? (
        <InputEditCell {...itemProps} />
      ) : (
        <InputViewCell
          disabled={disabled}
          onClick={onClick}
          focused={focused}
        />
      )}
    </Form.Item>
  );
};

export default InputCell;
