import React from 'react';
import { Form } from 'antd';
import CellBoolView from './cellBoolView';
import EditableTableCheckbox from './editableTableCheckbox';

const CheckboxCell = ({
  itemProps,
  focused,
  editing,
  onClick,
  columnKey,
  rowKey,
}) => {
  return (
    <Form.Item
      name={['data', rowKey, columnKey]}
      noStyle
      valuePropName="checked"
    >
      {editing ? (
        <EditableTableCheckbox {...itemProps} />
      ) : (
        <CellBoolView onClick={onClick} focused={focused} />
      )}
    </Form.Item>
  );
};

export default CheckboxCell;
