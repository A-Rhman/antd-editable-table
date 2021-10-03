import React, { useMemo, useContext, useEffect } from "react";
import { InputNumber } from "antd";
import { EditableTableContext } from "./editableTableBody";

const NumberEditCell = ({ value, onChange, ...rest }) => {
  const { stopEditing } = useContext(EditableTableContext);
  const prevValue = useMemo(() => value);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydownOnEdit);

    return () => {
      window.removeEventListener("keydown", (e) =>
        handleKeydownOnEdit(e, prevValue)
      );
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
