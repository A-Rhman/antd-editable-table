import React, { useMemo, useContext, useEffect } from "react";
import { Checkbox } from "antd";
import { EditableTableContext } from "./editableTableBody";

const CheckboxEditCell = ({ checked, onChange, ...rest }) => {
  const { stopEditing, moveFocus } = useContext(EditableTableContext);
  const prevValue = useMemo(() => checked);
  useEffect(() => {
    const handleKeydownOnEdit = (e) => {
      switch (e.keyCode) {
        case 27:
          onChange(prevValue);
          stopEditing();
          break;
        case 13:
          stopEditing();
          moveFocus("down");
          break;
      }
    };
    window.addEventListener("keydown", handleKeydownOnEdit);

    return () => {
      window.removeEventListener("keydown", handleKeydownOnEdit);
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

export default CheckboxEditCell;
