import React from 'react';

const TextInput = ({ label, placeholder, className, value, setValue, labelClassName, inputClassName }) => {
  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label htmlFor={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={`p-2 border border-gray-900 border-solid rounded placeholder-gray-500 ${inputClassName}`} // Apply inputClassName here
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
