import React from "react";

const TextInput = ({ label, value, onChange }) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter text"
      style={{ width: "100%", padding: "8px", margin: "5px 0" }}
    />
  </div>
);

export default React.memo(TextInput);
