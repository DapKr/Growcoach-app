import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import TextButton from '../../TextButton/TextButton';
import './formInputs.css';

export default function LinkListInput({
  name,
  label,
  hint = '',
  hintPosition = 'above',
  placeholderUrl = 'https://example.com',
  placeholderDesc = 'תיאור קצר (אופציונלי)',
}) {
  const {
    setValue,
    formState: { errors, isSubmitting, submitCount },
    setError,
    clearErrors,
  } = useFormContext();

  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setValue(name, links);
  }, [links, name, setValue]);

  // On form submit, if url is not empty, validate and add
  useEffect(() => {
    if (isSubmitting && url && !links.some((link) => link.url === url)) {
      try {
        new URL(url);
        clearErrors(name);
        setLinks((prev) => [...prev, { url, desc: '' }]);
        setUrl('');
      } catch {
        setError(name, {
          type: 'manual',
          message: 'קישור לא תקין, עדיף להעתיק את הכתובת ולא להזין ידנית',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, submitCount]);

  const handleAdd = () => {
    if (!url) {
      setError(name, { type: 'manual', message: 'יש להכניס כתובת' });
      return;
    }
    try {
      new URL(url);
      clearErrors(name);
      setLinks((prev) => [...prev, { url, desc: '' }]);
      setUrl('');
    } catch {
      setError(name, {
        type: 'manual',
        message: 'קישור לא תקין, עדיף להעתיק את הכתובת ולא להזין ידנית',
      });
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (errors[name]?.message) clearErrors(name);
  };

  const handleRemove = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDescChange = (index, value) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, desc: value } : link))
    );
  };

  return (
    <div className="form-input-wrapper" dir="rtl">
      {label && <label className="form-field-label">{label}</label>}
      {hint && hintPosition === 'above' && (
        <div className="form-field-hint">{hint}</div>
      )}
      <div className="link-input-wrapper">
        <input
          type="text"
          className={`form-input ${errors[name]?.message ? 'error' : ''}`}
          value={url}
          onChange={handleUrlChange}
          placeholder={placeholderUrl}
        />
      </div>
      <div style={{ textAlign: 'right', marginTop: 4 }}>
        <TextButton onClick={handleAdd}>הוספת קישור</TextButton>
      </div>
      {errors[name]?.message && (
        <div className="form-error-text">{errors[name].message}</div>
      )}
      {hint && hintPosition === 'below' && (
        <div className="form-field-hint">{hint}</div>
      )}
      <div className="link-list">
        {links.map((item, index) => (
          <div className="link-list-item" key={index}>
            <div className="link-list-header">
              <a
                href={item.url}
                className="link-url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.url}
              </a>
              <TextButton color="error" onClick={() => handleRemove(index)}>
                הסרה
              </TextButton>
            </div>
            <input
              type="text"
              className="form-input"
              value={item.desc}
              onChange={(e) => handleDescChange(index, e.target.value)}
              placeholder={placeholderDesc}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
