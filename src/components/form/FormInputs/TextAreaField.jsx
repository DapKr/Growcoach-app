import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function TextAreaField({
  name,
  label,
  hint = '',
  required = false,
  maxLength = 500
}) {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext();

  const value = watch(name) || '';
  const error = errors[name]?.message;

  return (
    <div className={`textarea-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      {hint && <div className="form-field-hint">{hint}</div>}

      <textarea
        id={name}
        maxLength={maxLength}
        rows={5}
        className={`form-textarea ${error ? 'error' : ''}`}
        {...register(name, {
          required: required ? 'שדה חובה' : false
        })}
      />

      <div className="word-counter">{value.length}/{maxLength}</div>

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
