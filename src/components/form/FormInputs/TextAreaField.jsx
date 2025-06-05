import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function TextAreaField({
  name,
  label,
  hint = '',
  required = false,
  maxLength = 500,
  value,
  onChange,
  ...rest
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const rhfValue = watch(name) || '';
  const error = errors[name]?.message;

  const textareaProps = {
    id: name,
    maxLength,
    rows: 5,
    className: `form-textarea ${error ? 'error' : ''}`,
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
    textareaProps.value = value;
    textareaProps.onChange = onChange;
  } else {
    Object.assign(
      textareaProps,
      register(name, {
        required: required ? 'שדה חובה' : false,
      })
    );
  }

  return (
    <div className={`textarea-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && (
        <label htmlFor={name} className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      {hint && <div className="form-field-hint">{hint}</div>}

      <textarea {...textareaProps} />

      <div className="word-counter">
        {typeof value !== 'undefined' ? value.length : rhfValue.length}/
        {maxLength}
      </div>

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
