import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Checkbox({ name, label, required = false }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={`checkbox-wrapper ${errors[name] ? 'has-error' : ''}`}
      dir="rtl"
    >
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register(name, { required: required && 'שדה חובה' })}
        />
        <span className="checkbox-text">{label}</span>
      </label>
      {errors[name] && (
        <div className="form-error-text">{errors[name].message}</div>
      )}
    </div>
  );
}
