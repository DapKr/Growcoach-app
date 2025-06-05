import React from 'react';
import CheckboxWithLabel from '../../../components/form/FormInputs/CheckboxWithLabel';

export default function ConsentSection() {
  return (
    <section className="section-box">
      <h2 className="form-section-title">הסכמות</h2>
      <div className="consent-checkboxes">
        <CheckboxWithLabel
          name="consentProfile"
          label="אני מאשר/ת שכל הפרטים שמילאתי נכונים ומדויקים"
          required
        />
        <CheckboxWithLabel
          name="consentContact"
          label="אני מאשר/ת קבלת פניות מהורים דרך האתר"
          required
        />
      </div>
    </section>
  );
}
