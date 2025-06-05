import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function TextField({
  name,
  label,
  type = 'text',
  hint = '',
  required = false,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className={`form-input-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      {hint && (
        <div className="form-field-hint" style={{ whiteSpace: 'pre-line' }}>
          {hint}
        </div>
      )}

      <input
        id={name}
        type={type}
        className={`form-input ${error ? 'error' : ''}`}
        {...register(name, {
          required: required ? 'שדה חובה' : false,
          ...(type === 'email' && {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'כתובת מייל לא תקינה',
            },
          }),
          ...(type === 'tel' && {
            pattern: {
              value: /^[0-9+\-\s()]{6,20}$/,
              message: 'מספר טלפון לא תקין',
            },
          }),
        })}
      />

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
