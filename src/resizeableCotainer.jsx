import React, { useRef, useState } from "react";

const ResizeableCotainer = ({
  children,
  width,
  onNewWidth,
  className,
  ...rest
}) => {
  const [offsetX, setOffsetX] = useState(0);
  const handlerRef = useRef(null);
  const containerRef = useRef(null);
  const move = (e) => {
    const el = handlerRef?.current;
    if (!el || !containerRef?.current) return;
    el.classList.add("active");
    const containerOffset =
      containerRef?.current?.getBoundingClientRect()?.left;
    el.style.left = `${e.pageX - containerOffset - offsetX}px`;
  };
  const add = (e) => {
    const el = handlerRef?.current;
    if (!el) return;
    setOffsetX(e.clientX - el.getBoundingClientRect().left);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", updateWidth);
  };
  const updateWidth = () => {
    onNewWidth(parseInt(handlerRef?.current.style.left, 10));
    handlerRef.current?.classList.remove("active");
    remove();
  };
  const remove = () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", updateWidth);
  };

  //   (calculated width + offsetX) of container..

  return (
    <th
      ref={containerRef}
      {...rest}
      className={className + " resize-container"}
    >
      {children}
      <div
        className="resize-handler"
        ref={handlerRef}
        onMouseDown={add}
        onMouseUp={remove}
        style={{ left: width + "px" }}
      />
    </th>
  );
};

export default ResizeableCotainer;
