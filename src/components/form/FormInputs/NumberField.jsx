import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function NumberField({
  name,
  label,
  hint = '',
  required = false,
  min = 0,
  max = 99,
  step = 1,
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className={`form-input-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      {hint && <div className="form-field-hint">{hint}</div>}

      <input
        id={name}
        type="number"
        min={min}
        max={max}
        step={step}
        className={`form-input ${error ? 'error' : ''}`}
        {...register(name, {
          required: required ? 'שדה חובה' : false,
          min: { value: min, message: `המספר צריך להיות לפחות ${min}` },
          max: { value: max, message: `המספר לא יכול להיות מעל ${max}` }
        })}
      />

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
