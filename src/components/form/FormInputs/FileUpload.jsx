// src/components/form/FormInputs/FileUpload.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function FileUpload({
  name,
  label,
  fileTypes = [], // אם רוצים לבדוק פורמטים בדוק>ת
  accept, // מחרוזת כמו ".pdf,.jpg"
  multiple = false, // האם להעלות יותר מקובץ אחד
  maxSizeKB = Infinity,
}) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  // אם קיבלנו prop accept, עדיף אותו, אחרת בונים מ־fileTypes
  const acceptAttr = accept
    ? accept
    : fileTypes.length
      ? fileTypes.join(',')
      : undefined;

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      setValue(name, multiple ? [] : null);
      return;
    }

    // בדיקת פורמט (optional)
    if (fileTypes.length) {
      const badType = files.some((f) => !fileTypes.includes(f.type));
      if (badType) {
        alert('פורמט קובץ לא נתמך.');
        setValue(name, multiple ? [] : null);
        return;
      }
    }

    // בדיקת גודל (optional)
    const tooBig = files.some((f) => f.size > maxSizeKB * 1024);
    if (tooBig) {
      alert(`הקובץ גדול מ־${maxSizeKB}KB.`);
      setValue(name, multiple ? [] : null);
      return;
    }

    setValue(name, multiple ? files : files[0]);
  };

  return (
    <div className={`form-input-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      {label && <label className="form-field-label">{label}</label>}
      <input
        type="file"
        accept={acceptAttr}
        multiple={multiple}
        onChange={handleChange}
      />
      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}
