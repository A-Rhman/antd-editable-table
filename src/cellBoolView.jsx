import React, { useContext, useEffect, memo } from 'react';
import { EditableTableContext } from './editableTable';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const CellBoolView = ({ checked, focused, ...rest }) => {
  const { handleKeyDown } = useContext(EditableTableContext);

  useEffect(() => {
    window.addEventListener('keydown', focused ? handleKeyDown : null);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focused]);

  return (
    <div className={`cell-view${focused ? ' cell-focused' : ''}`} {...rest}>
      {checked ? <CheckOutlined /> : <CloseOutlined />}
    </div>
  );
};

export default memo(CellBoolView);
