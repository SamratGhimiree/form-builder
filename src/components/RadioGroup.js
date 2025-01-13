import React from "react";

const RadioGroup = ({ label, options, selectedValue, onChange }) => (
  <div>
    <label>{label}</label>
    {options.map((option, index) => (
      <div key={index}>
        <input
          type="radio"
          value={option}
          checked={selectedValue === option}
          onChange={() => onChange(option)}
        />
        {option}
      </div>
    ))}
  </div>
);

export default React.memo(RadioGroup);
