import React from "react";

const SelectDropdown = ({ label, options, value, onChange }) => (
  <div>
    <label>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", padding: "8px", margin: "5px 0" }}
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default React.memo(SelectDropdown);
