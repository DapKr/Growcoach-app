import React from 'react';
import { useFormContext } from 'react-hook-form';
import './formInputs.css';


export default function FileUpload({ name, label, fileTypes, maxSizeKB }) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className={`form-field-wrapper ${error ? 'has-error' : ''}`} dir="rtl">
      <label className="form-field-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        type="file"
        accept={fileTypes.join(',')}
        {...register(name, {
          validate: fileList => {
            const file = fileList[0];
            if (!file) return true;
            if (!fileTypes.includes(file.type)) {
              return 'לא ניתן להעלות קובץ מסוג זה, נא העלו קובץ מתאים';
            }
            if (file.size > maxSizeKB * 1024) {
              return `לא ניתן להעלות את הקובץ, יש להעלות קובץ עד ${maxSizeKB}KB`;
            }
            return true;
          }
        })}
      />
      {error && <div className="form-error-text">{error}</div>}
    </div>
  );
}