import React from "react";
import ResizeableCotainer from "./resizeableCotainer";

const ResizeableTableHeader = ({
  onResize,
  width,
  //direction,
  ...restProps
}) => {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <ResizeableCotainer onNewWidth={onResize} width={width} {...restProps} />
  );
};

export default ResizeableTableHeader;
