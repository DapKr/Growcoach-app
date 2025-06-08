// src/pages/profile/sections/ProfessionalExperienceSection.jsx
import React from 'react';
import MultiSelectDropdown from '../../../components/form/FormInputs/MultiSelectDropdown';
import NumberField from '../../../components/form/FormInputs/NumberField';
import TextAreaField from '../../../components/form/FormInputs/TextAreaField';
import MultiFileUpload from '../../../components/form/FormInputs/MultiFileUpload';
import LinkListInput from '../../../components/form/FormInputs/LinkListInput';

export default function ProfessionalExperienceSection() {
  return (
    <section className="section-box">
      <h2 className="form-section-title">נסיון מקצועי</h2>

      {/* ארבעת השדות העליונים */}
      <div className="experience-grid">
        <div className="select-wrapper">
          <MultiSelectDropdown
            name="expertise"
            label="תחום התמחות"
            options={[]} // נטען בעתיד
            allowCustom={false}
          />
        </div>

        <div className="select-wrapper">
          <NumberField
            name="experienceYears"
            label="שנות נסיון"
            min={0}
            max={99}
            required
          />
        </div>

        <div className="select-wrapper">
          <MultiSelectDropdown
            name="approach"
            label="גישת טיפול (אופציונלי)"
            options={[]} // נטען בעתיד
            allowCustom={true}
          />
        </div>

        <div className="select-wrapper">
          <MultiSelectDropdown
            name="meetingType"
            label="צורת המפגש (אופציונלי)"
            options={[]} // נטען בעתיד
            allowCustom={true}
          />
        </div>
      </div>

      {/* טקסט ארוך עם ספירת תווים */}
      <div className="about-section">
        <TextAreaField
          name="about"
          label="קצת על עצמך"
          hint="ספר על הרקע והגישה המקצועית שלך. עד 500 תווים."
          maxLength={500}
        />
      </div>

      {/* שלושת השדות התומכים: תעודות, קישורים לאתרים וקישורים להמלצות */}
      <div className="supporting-inputs">
        {/* העלאת תעודות */}
        <div className="form-input-wrapper">
          <MultiFileUpload
            name="certificates"
            label="תעודות הסמכה"
            hint="העלות קבצים עד 2MB כל אחד; הקובץ יישמר רק באתר."
            fileTypes={['application/pdf', 'image/jpeg', 'image/png']}
            maxSizeKB={2048}
          />
        </div>

        {/* קישורים לאתרים */}
        <LinkListInput
          name="additionalLinks"
          label="קישורים לאתרים"
          hint="כדי להוסיף קישור יש להעתיק את כתובת האתר ישירות ולא להקליד ידנית"
          placeholderUrl="https://example.com"
          placeholderDesc="תיאור קצר (אופציונלי)"
        />

        {/* קישורים להמלצות */}
        <LinkListInput
          name="reviews"
          label="קישורים להמלצות"
          hint="בשביל לשמור על אמינות, מציגים רק חוות דעת מאתרים רשמיים. שלח.י קישורים – ואחרי אימות, הן יוצגו כטקסט בפרופיל שלך."
          placeholderUrl="https://example.com"
          placeholderDesc="תיאור קצר (אופציונלי)"
        />
      </div>
    </section>
  );
}
