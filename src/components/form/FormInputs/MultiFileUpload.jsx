import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from './TextField';
import TextButton from '../../TextButton/TextButton';
import './formInputs.css';

export default function MultiFileUpload({
  name,
  label,
  hint = '',
  hintPosition = 'above', // 'above' or 'below'
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
      {hint && hintPosition === 'above' && (
        <div className="form-field-hint">{hint}</div>
      )}
      <div style={{ textAlign: 'right' }}>
        <TextButton onClick={onAddClick}>הוספת קובץ</TextButton>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      {/* Error always appears directly under the input, pushing hint/content down */}
      {errors[name] && (
        <div className="form-error-text">{errors[name].message}</div>
      )}
      {hint && hintPosition === 'below' && (
        <div className="form-field-hint">{hint}</div>
      )}
      <div className="link-list">
        {items.map((it, idx) => (
          <div key={idx} className="link-list-item">
            <div className="link-list-header">
              <span className="link-url">{it.file.name}</span>
              <TextButton color="error" onClick={() => onRemove(idx)}>
                הסרה
              </TextButton>
            </div>
            <TextField
              name={`${name}-desc-${idx}`}
              type="text"
              value={it.description}
              onChange={(e) => onDescChange(idx, e.target.value)}
              placeholder="תיאור קצר (אופציונלי)"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
