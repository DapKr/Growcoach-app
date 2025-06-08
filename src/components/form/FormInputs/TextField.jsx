import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function TextField({
  name,
  label,
  type = 'text',
  hint = '',
  hintPosition = 'above', // 'above' or 'below'
  required = false,
  placeholder,
  value,
  onChange,
  ...rest
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  const inputProps = {
    id: name,
    type,
    className: `form-input ${error ? 'error' : ''}`,
    placeholder,
    onDoubleClick: (e) => {
      e.preventDefault();
      if (document.activeElement !== e.target) {
        e.target.focus();
      }
      e.target.select();
    },
    onMouseDown: (e) => {
      if (e.detail === 2) {
        e.preventDefault();
        if (document.activeElement !== e.target) {
          e.target.focus();
        }
        e.target.select();
      }
    },
    onPointerDown: (e) => {
      if (e.detail === 2) {
        e.preventDefault();
        if (document.activeElement !== e.target) {
          e.target.focus();
        }
        e.target.select();
      }
    },
    ...rest,
  };

  if (typeof value !== 'undefined' && typeof onChange === 'function') {
    inputProps.value = value;
    inputProps.onChange = onChange;
  } else {
    Object.assign(
      inputProps,
      register(name, {
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
      })
    );
  }

  return (
    <div className={`form-input-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      {hint && hintPosition === 'above' && (
        <div className="form-field-hint" style={{ whiteSpace: 'pre-line' }}>
          {hint}
        </div>
      )}

      <input {...inputProps} />

      {hint && hintPosition === 'below' && (
        <div className="form-field-hint" style={{ whiteSpace: 'pre-line' }}>
          {hint}
        </div>
      )}

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
