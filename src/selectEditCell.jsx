import React, { useMemo, memo, useContext, useEffect } from "react";
import { Select } from "antd";
import { EditableTableContext } from "./editableTableBody";
const { Option } = Select;

const SelectEditCell = ({
  value,
  onChange,
  onFilter,
  rowKey,
  options,
  ...rest
}) => {
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

  const filteredOptions =
    typeof onFilter === "function" ? onFilter(rowKey) : options;

  return (
    <Select
      autoFocus
      onBlur={stopEditing}
      onChange={onChange}
      value={value}
      {...rest}
    >
      {filteredOptions?.map((op) => (
        <Option key={op.id} value={op.id}>
          {op.name}
        </Option>
      ))}
    </Select>
  );
};

export default memo(SelectEditCell);
