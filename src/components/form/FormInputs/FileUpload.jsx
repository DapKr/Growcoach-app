import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';

export default function FileUpload({
  name,
  label,
  fileTypes = [],
  accept,
  multiple = false,
  maxSizeKB = Infinity,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  const acceptAttr = accept
    ? accept
    : fileTypes.length
      ? fileTypes.join(',')
      : undefined;

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      setSelectedFiles([]);
      setValue(name, multiple ? [] : null);
      return;
    }

    if (fileTypes.length) {
      const badType = files.some((f) => !fileTypes.includes(f.type));
      if (badType) {
        alert('פורמט קובץ לא נתמך.');
        setSelectedFiles([]);
        setValue(name, multiple ? [] : null);
        return;
      }
    }

    const tooBig = files.some((f) => f.size > maxSizeKB * 1024);
    if (tooBig) {
      alert(`הקובץ גדול מ־${maxSizeKB}KB.`);
      setSelectedFiles([]);
      setValue(name, multiple ? [] : null);
      return;
    }

    setSelectedFiles(files);
    setValue(name, multiple ? files : files[0]);
  }; // ← this was missing

  const handleRemove = (index) => {
    const updated = [...selectedFiles];
    updated.splice(index, 1);
    setSelectedFiles(updated);
    setValue(name, multiple ? updated : null);
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

      {selectedFiles.length > 0 && (
        <div className="link-list">
          {selectedFiles.map((file, index) => (
            <div className="link-list-item" key={index}>
              <div className="link-list-header">
                <span className="link-url">{file.name}</span>
                <button
                  type="button"
                  className="link-remove-btn"
                  onClick={() => handleRemove(index)}
                >
                  הסרה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
