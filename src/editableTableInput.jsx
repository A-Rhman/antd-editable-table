import React, { useMemo, useContext, useEffect } from 'react';
import { Input } from 'antd';
import { EditableTableContext } from './editableTable';

const EditableTableInput = ({ value, onChange, ...rest }) => {
  const { stopEditing, moveFocus } = useContext(EditableTableContext);
  const prevValue = useMemo(() => value);

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
    <Input
      autoFocus
      onBlur={stopEditing}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default EditableTableInput;
