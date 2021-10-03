import React, { useContext, useEffect, memo } from "react";
import { EditableTableContext } from "./editableTableBody";

const NumberViewCell = ({ value, disabled, focused, ...rest }) => {
  const { moveFocus, startEditing } = useContext(EditableTableContext);
  useEffect(() => {
    const handleKeydownOnView = (e) => {
      switch (e.keyCode) {
        case 38:
          moveFocus("up");
          break;
        case 40:
          moveFocus("down");
          break;
        case 37:
          moveFocus("left");
          break;
        case 39:
          moveFocus("right");
          break;
        case 13:
          // enter
          disabled !== true && startEditing();
          break;
      }
    };
    focused && window.addEventListener("keydown", handleKeydownOnView);

    return () => {
      window.removeEventListener("keydown", handleKeydownOnView);
    };
  }, [focused]);

  return (
    <div
      className={`cell-view${focused ? " cell-focused" : ""}${
        disabled ? " cell-disabled" : ""
      }`}
      {...rest}
    >
      {value || <span>&nbsp;</span>}
    </div>
  );
};

export default memo(NumberViewCell);
