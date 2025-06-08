// src/pages/profile/sections/ProfessionalExperienceSection.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import MultiSelectDropdown from '../../../components/form/FormInputs/MultiSelectDropdown';
import NumberField from '../../../components/form/FormInputs/NumberField';
import TextAreaField from '../../../components/form/FormInputs/TextAreaField';
import MultiFileUpload from '../../../components/form/FormInputs/MultiFileUpload';
import LinkListInput from '../../../components/form/FormInputs/LinkListInput';
import TextField from '../../../components/form/FormInputs/TextField';

export default function ProfessionalExperienceSection() {
  const { watch } = useFormContext();
  const expertiseValue = watch('expertise') || [];
  const approachValue = watch('approach') || [];
  const meetingTypeValue = watch('meetingType') || [];

  const filterOption = (candidate, input) => {
    if (!input) return true;
    return candidate.label.includes(input);
  };

  // Options for each dropdown
  const expertiseOptions = [
    {
      label: '',
      options: [
        {
          value: 'pregnancy, birth, post-birth',
          label: 'הריון, לידה ופוסט-לידה',
        },
        { value: 'babies 0-1', label: 'תינוקות- לידה עד שנה' },
        { value: 'infants 1-6', label: 'גיל הרך- שנה עד 6 שנים' },
        { value: 'elementary 6-12', label: 'ילדי בית ספר- 6-12 שנים' },
        { value: 'teens 12+', label: 'מתבגרים- 12+ שנים' },
        { value: 'special needs', label: 'הורים לילדים עם צרכים מיוחדים' },
        {
          value: 'family breakdown',
          label: 'משברים משפחתיים- גירושין, אובדן ועוד',
        },
        { value: 'behavioral issues', label: 'קשיי התנהגות וגבולות' },
        { value: 'parenting and technology', label: 'הורות וטכנולוגיה' },
        { value: 'sleep consultation', label: 'ייעוץ שינה' },
        { value: 'other', label: 'אחר' },
      ],
    },
  ];
  const approachOptions = [
    {
      label: '',
      options: [
        { value: 'adler', label: 'גישת אדלר' },
        { value: 'cbt', label: 'גישה קוגניטיבית-התנהגותית (CBT)' },
        { value: 'development', label: 'גישה התפתחותית' },
        { value: 'family systems', label: 'הגישה המערכתית/משפחתית' },
        { value: 'attachment-based', label: 'גישת הורות מבוססת קשר' },
        { value: 'positive', label: 'גישת הורות חיובית' },
        { value: 'other', label: 'אחר' },
      ],
    },
  ];
  const meetingTypeOptions = [
    {
      label: '',
      options: [
        { value: 'meeting in-person', label: 'פגישות אישיות פרונטלי' },
        { value: 'meeting online', label: 'פגישות אישיות אונליין' },
        { value: 'group in-person', label: 'קבוצות פרונטלי' },
        { value: 'group online', label: 'קבוצות אונליין' },
        { value: 'lecture in-person', label: 'הרצאות פרונטלי' },
        { value: 'lecture online', label: 'הרצאות אונליין' },
        { value: 'workshop', label: 'סדנאות' },
        { value: 'digital courses', label: 'קורסים דיגיטליים' },
        { value: 'consultation', label: 'ייעוץ טלפוני' },
        { value: 'other', label: 'אחר' },
      ],
    },
  ];

  return (
    <section className="section-box">
      <span className="form-section-title">נסיון מקצועי</span>

      {/* ארבעת השדות העליונים */}
      <div className="experience-grid">
        <div className="select-wrapper">
          <MultiSelectDropdown
            name="expertise"
            label="תחום התמחות"
            options={expertiseOptions}
            required
            allowCustom={true}
            filterOption={filterOption}
          />
          {expertiseValue.includes('other') && (
            <TextField
              name="customExpertise"
              label="פירוט אחר"
              required
              hint=""
              hintPosition="below"
            />
          )}
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
            label="גישת טיפול"
            options={approachOptions}
            allowCustom={true}
            filterOption={filterOption}
          />
          {approachValue.includes('other') && (
            <TextField
              name="customApproach"
              label="פירוט אחר"
              required
              hint=""
              hintPosition="below"
            />
          )}
        </div>

        <div className="select-wrapper">
          <MultiSelectDropdown
            name="meetingType"
            label="צורת המפגש"
            options={meetingTypeOptions}
            allowCustom={true}
            filterOption={filterOption}
          />
          {meetingTypeValue.includes('other') && (
            <TextField
              name="customMeetingType"
              label="פירוט אחר"
              required
              hint=""
              hintPosition="below"
            />
          )}
        </div>
      </div>

      {/* טקסט ארוך עם ספירת תווים */}
      <div className="about-section">
        <TextAreaField
          name="about"
          label="קצת על עצמך"
          hint="ספר על הרקע והגישה המקצועית שלך. עד 500 תווים."
          hintPosition="above"
          maxLength={500}
        />
      </div>

      {/* שלושת השדות התומכים: תעודות, קישורים לאתרים וקישורים להמלצות */}
      <div className="supporting-inputs">
        <div className="supporting-inputs-header">
          <span className="form-section-subtitle">הסמכות וקישורים</span>
          <span className="form-section-info">
            כדי להציג את המידע בפרופיל, נדרש קובץ או קישור לצורכי אימות.
          </span>
        </div>
        <div className="form-field-row">
          {/* קישורים לאתרים */}
          <LinkListInput
            name="additionalLinks"
            label="קישורים לאתרים"
            hint="מומלץ לצרף קישורים לאתר בית, פייסבוק, אינסטגרם, פודקאסטים בהשתתפותך או כל קישור רלוונטי נוסף"
            placeholderUrl="https://example.com"
            placeholderDesc="תיאור קצר"
            hintPosition="below"
          />

          {/* קישורים להמלצות */}
          <LinkListInput
            name="reviews"
            label="קישורים להמלצות"
            hint="לאחר אימות ההמלצות יוצגו בפרופיל"
            placeholderUrl="https://example.com"
            placeholderDesc="תיאור קצר"
            hintPosition="below"
          />
          {/* העלאת תעודות */}
          <div className="form-input-wrapper">
            <MultiFileUpload
              name="certificates"
              label="תעודות הסמכה"
              hint="עד 2MB לקובץ"
              fileTypes={['application/pdf', 'image/jpeg', 'image/png']}
              maxSizeKB={2048}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
