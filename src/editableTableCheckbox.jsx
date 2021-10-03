import React, { useMemo, useContext, useEffect } from 'react';
import { Checkbox } from 'antd';
import { EditableTableContext } from './editableTable';

const EditableTableCheckbox = ({ checked, onChange, ...rest }) => {
  const { stopEditing, moveFocus } = useContext(EditableTableContext);
  const prevValue = useMemo(() => checked);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 27:
          onChange(prevValue);
          stopEditing();
          break;
        case 13:
          stopEditing();
          moveFocus('down');
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Checkbox
      autoFocus
      onBlur={stopEditing}
      onChange={onChange}
      checked={checked}
      {...rest}
    />
  );
};

export default EditableTableCheckbox;
