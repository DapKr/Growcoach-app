import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '../../../components/form/FormInputs/TextField';
import MultiSelectDropdown from '../../../components/form/FormInputs/MultiSelectDropdown';
import TextAreaField from '../../../components/form/FormInputs/TextAreaField';
import NumberField from '../../../components/form/FormInputs/NumberField';

export default function ProfessionalExperienceSection() {
  const { watch } = useFormContext();
  const selectedExpertise = watch('expertise');
  const selectedApproach = watch('approach');
  const selectedMeetingType = watch('meetingType');

  return (
    <section className="section-box">
      <h2 className="form-section-title">ניסיון מקצועי</h2>

      <div className="form-field-column">
        <MultiSelectDropdown
          name="expertise"
          label="תחום התמחות"
          required
          options={[]} // יש לטעון את הרשימה הרלוונטית
          allowCustom
          customFieldName="customExpertise"
          placeholder="בחר/י תחום או הוסף/י חדש"
        />

        <NumberField
          name="experienceYears"
          label="שנות ניסיון"
          type="number"
          required
        />

        <MultiSelectDropdown
          name="approach"
          label="גישת טיפול (אופציונלי)"
          options={[]} // יש לטעון את הרשימה הרלוונטית
          allowCustom
          customFieldName="customApproach"
          placeholder="בחר/י גישה או הוסף/י חדשה"
        />

        <MultiSelectDropdown
          name="meetingType"
          label="צורת המפגש (אופציונלי)"
          options={[
            { value: 'פרטני פנים מול פנים', label: 'פרטני פנים מול פנים' },
            { value: 'פרטני בשיחת וידאו', label: 'פרטני בשיחת וידאו' },
            { value: 'סדנאות קבוצתיות', label: 'סדנאות קבוצתיות' },
            { value: 'סדרת מפגשים קבועה מראש', label: 'סדרת מפגשים קבועה מראש' },
            { value: 'קורסים פנים מול פנים', label: 'קורסים פנים מול פנים' },
            { value: 'קורסים אונליין', label: 'קורסים אונליין' },
            { value: 'הרצאות', label: 'הרצאות' }
          ]}
          allowCustom
          customFieldName="customMeetingType"
          placeholder="בחר/י סוג מפגש או הוסף/י חדש"
        />

        <TextAreaField
          name="about"
          label="קצת על עצמך"
          hint="זו ההזדמנות שלך להראות להורים מי את. באמת. תני סיפור על הדרך המקצועית, השראה אישית או כל דבר שאפשר להרגיש ממנו חיבור."
          maxLength={500}
        />

      </div>
    </section>
  );
}
