import React from "react";
import { useDrag } from "react-dnd";

const DraggableField = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        padding: "10px",
        border: "1px dashed gray",
        margin: "10px 0",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableField;
