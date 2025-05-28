import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function MultiFileUpload({
  name,
  label,
  hint = '',
  fileTypes = [], // לדוג׳ ['application/pdf','image/png']
  accept, // לדוג׳ ".pdf,.png,.jpg"
  maxSizeKB = Infinity, // גודל מקסימלי בקילובייט
}) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const items = watch(name) || [];
  const inputRef = useRef();

  // קובעים את ה־accept לפקודת ה־input
  const acceptAttr = accept
    ? accept
    : fileTypes.length
      ? fileTypes.join(',')
      : undefined;

  const onAddClick = () => {
    inputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';

    // בדיקת פורמט
    if (fileTypes.length && !fileTypes.includes(file.type)) {
      alert('פורמט קובץ לא נתמך.');
      return;
    }
    // בדיקת גודל
    if (file.size > maxSizeKB * 1024) {
      alert(`הקובץ גדול מדי (מעל ${maxSizeKB}KB).`);
      return;
    }

    setValue(name, [...items, { file, description: '' }]);
  };

  const onRemove = (idx) => {
    setValue(
      name,
      items.filter((_, i) => i !== idx)
    );
  };

  const onDescChange = (idx, desc) => {
    const updated = items.map((it, i) =>
      i === idx ? { ...it, description: desc } : it
    );
    setValue(name, updated);
  };

  return (
    <div
      className={`form-input-wrapper ${errors[name] ? 'has-error' : ''}`}
      dir="rtl"
    >
      {label && <label className="form-field-label">{label}</label>}
      {hint && <div className="form-field-hint">{hint}</div>}

      <button type="button" className="file-upload-button" onClick={onAddClick}>
        הוספת קובץ
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />

      <ul className="file-upload-list">
        {items.map((it, idx) => (
          <li key={idx} className="file-upload-item">
            <span className="file-name">{it.file.name}</span>
            <button
              type="button"
              className="file-remove-button"
              onClick={() => onRemove(idx)}
            >
              הסרה
            </button>
            <input
              type="text"
              className="file-description-input"
              placeholder="תיאור קצר לקובץ"
              value={it.description}
              onChange={(e) => onDescChange(idx, e.target.value)}
            />
          </li>
        ))}
      </ul>

      {errors[name] && (
        <div className="form-error-text">{errors[name].message}</div>
      )}
    </div>
  );
}
