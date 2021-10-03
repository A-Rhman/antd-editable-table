import React, { useMemo, useContext, useEffect } from "react";
import { InputNumber } from "antd";
import { EditableTableContext } from "./editableTableBody";

const NumberEditCell = ({ value, onChange, ...rest }) => {
  const { stopEditing, moveFocus } = useContext(EditableTableContext);
  const prevValue = useMemo(() => value);

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
    <InputNumber
      autoFocus
      onBlur={stopEditing}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default NumberEditCell;
