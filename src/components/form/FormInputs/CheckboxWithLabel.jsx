import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function CheckboxWithLabel({
  name,
  label,
  description,
  required = false,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div
      className={`form-field-wrapper checkbox-wrapper ${error ? 'has-error' : ''}`}
      dir="rtl"
    >
      <div className="checkbox-line">
        <input
          id={name}
          type="checkbox"
          className="custom-checkbox"
          {...register(name, {
            validate: (value) => (required && !value ? 'נא לאשר' : true),
          })}
        />
        <label htmlFor={name} className="form-checkbox-label">
          {label}
        </label>
      </div>
      {description && <div className="form-field-hint">{description}</div>}
      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
