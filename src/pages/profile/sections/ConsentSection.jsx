import React from 'react';
import CheckboxWithLabel from '../../../components/form/FormInputs/CheckboxWithLabel';

export default function ConsentSection() {
  return (
    <section className="section-box">
      <span className="form-section-title">הסכמות</span>
      <div className="consent-checkboxes">
        <CheckboxWithLabel
          name="consentProfile1"
          label="אני מאשר/ת שכל הפרטים שמילאתי נכונים ומדויקים"
          required
        />
        <CheckboxWithLabel
          name="consentProfile2"
          label="אני מאשר.ת ל־GrowCoach להשתמש בפרטים שציינתי לצורך יצירת הפרופיל שלי באתר."
          required
        />
        <CheckboxWithLabel
          name="consentProfile3"
          label="אני מאשר.ת לנציג.י GrowCoach ליצור איתי קשר כחלק מתהליך אימות הזהות."
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
