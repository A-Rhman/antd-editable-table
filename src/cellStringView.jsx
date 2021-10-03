import React, { useContext, useEffect, memo } from 'react';
import { EditableTableContext } from './editableTable';

const CellStringView = ({ value, focused, ...rest }) => {
  const { moveFocus, startEditing } = useContext(EditableTableContext);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 38:
          moveFocus('up');
          break;
        case 40:
          moveFocus('down');
          break;
        case 37:
          moveFocus('left');
          break;
        case 39:
          moveFocus('right');
          break;
        case 13:
          // enter
          startEditing();
          break;
      }
    };
    window.addEventListener('keydown', focused ? handleKeyDown : null);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focused]);
  return (
    <div className={`cell-view${focused ? ' cell-focused' : ''}`} {...rest}>
      {value}
    </div>
  );
};

export default memo(CellStringView);
