import React from "react";

const CustomInput = ({
  type,
  name,
  placeholder,
  className,
  value,
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        className={`form-control ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
