import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: "200px",
        border: "2px dashed gray",
        backgroundColor: isOver ? "#f0f9f0" : "#fafafa",
        padding: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;
