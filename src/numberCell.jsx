import React, { useContext } from "react";
import { Form } from "antd";
import NumberViewCell from "./numberViewCell";
import NumberEditCell from "./numberEditCell";
import { EditableTableContext } from "./editableTableBody";

const InputCell = ({
  itemProps,
  focused,
  editing,
  onClick,
  disabled,
  columnKey,
  rowKey,
}) => {
  const { dataKey } = useContext(EditableTableContext);
  return (
    <Form.Item name={[dataKey, rowKey, columnKey]} noStyle>
      {editing ? (
        <NumberEditCell {...itemProps} />
      ) : (
        <NumberViewCell
          onClick={onClick}
          focused={focused}
          disabled={disabled}
        />
      )}
    </Form.Item>
  );
};

export default InputCell;
