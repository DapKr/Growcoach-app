import React from 'react';
import Select from 'react-select';
import { useController, useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function MultiSelectDropdown({
  name,
  label,
  options,
  required = false,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const {
    field: { onChange, value, ref },
  } = useController({ name, control });

  const error = errors[name]?.message;

  return (
    <div className={`form-field-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && (
        <label className="form-field-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <Select
        ref={ref}
        options={options}
        isMulti
        value={options.filter((opt) => value?.includes(opt.value))}
        onChange={(selected) => onChange(selected.map((opt) => opt.value))}
        placeholder="בחר/י מהרשימה..."
        classNamePrefix="react-select"
      />

      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
