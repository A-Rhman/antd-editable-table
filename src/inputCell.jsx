import React from 'react';
import { Form } from 'antd';
import CellStringView from './cellStringView';
import EditableTableInput from './editableTableInput';

const InputCell = ({
  itemProps,
  focused,
  editing,
  onClick,
  columnKey,
  rowKey,
}) => {
  return (
    <Form.Item name={['data', rowKey, columnKey]} noStyle>
      {editing ? (
        <EditableTableInput {...itemProps} />
      ) : (
        <CellStringView onClick={onClick} focused={focused} />
      )}
    </Form.Item>
  );
};

export default InputCell;
