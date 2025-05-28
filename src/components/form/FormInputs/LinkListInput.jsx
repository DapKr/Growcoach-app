import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import './formInputs.css';

export default function LinkListInput({
  name,
  label,
  hint = '',
  placeholderUrl = '',
  placeholderDesc = '',
}) {
  const {
    register,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
    defaultValue: [],
  });

  const [url, setUrl] = useState('');

  const handleAdd = () => {
    if (!url) {
      setError(name, { type: 'manual', message: 'יש להכניס כתובת' });
      return;
    }
    try {
      new URL(url);
      clearErrors(name);
      append({ url, desc: '' });
      setUrl('');
    } catch {
      setError(name, {
        type: 'manual',
        message: 'כתובת URL לא תקינה',
      });
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (errors[name]?.message) clearErrors(name);
  };

  return (
    <div className="form-input-wrapper" dir="rtl">
      {label && <label className="form-field-label">{label}</label>}
      {hint && <div className="form-field-hint">{hint}</div>}

      <div className="link-input-row">
        <input
          type="text"
          className={`form-input ${errors[name]?.message ? 'error' : ''}`}
          value={url}
          onChange={handleUrlChange}
          placeholder={placeholderUrl}
          dir="ltr"
        />
        <button type="button" className="link-add-btn" onClick={handleAdd}>
          הוספה
        </button>
      </div>

      {errors[name]?.message && (
        <div className="form-error-text">{errors[name].message}</div>
      )}

      <div className="link-list">
        {fields.map((item, index) => (
          <div className="link-list-item" key={item.id}>
            <span className="link-url" title={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
              >
                {item.url}
              </a>
            </span>
            <button
              type="button"
              className="link-remove-btn"
              onClick={() => remove(index)}
              tabIndex={-1}
            >
              הסר
            </button>
            <input
              type="text"
              className="link-desc-input"
              placeholder={placeholderDesc || 'תיאור קצר (אופציונלי)'}
              {...register(`${name}.${index}.desc`)}
              defaultValue={item.desc}
              style={{ marginTop: '6px', width: '100%' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
