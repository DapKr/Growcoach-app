import React from 'react';
//import { useFormContext } from 'react-hook-form';
import TextField from '../../../components/form/FormInputs/TextField';
import CheckboxWithLabel from '../../../components/form/FormInputs/CheckboxWithLabel';
import MultiSelectDropdown from '../../../components/form/FormInputs/MultiSelectDropdown';
import ProfileImageUpload from '../../../components/form/ProfileImageUpload/ProfileImageUpload';

export default function ContactDetailsSection() {
  //const { watch } = useFormContext();
  //const emailValue = watch('email');

  return (
    <section className="section-box">
      <h2 className="form-section-title">פרטים אישיים</h2>

      <div className="contact-details-grid">
        <div className="profile-image-column">
          <ProfileImageUpload
            name="profileImage"
            label="הוספת תמונה"
            fileTypes={['image/jpeg', 'image/png']}
            maxSizeKB={500}
          />
        </div>

        <div className="form-field-column">
          <TextField name="fullName" label="שם מלא" required />

          <TextField
            name="phone"
            label="טלפון"
            type="tel"
            required
            hint="כחלק מתהליך האימות, אנו מבקשים מספר טלפון. הוא לא יוצג בפרופיל אלא אם תבחר/י. אם לא – פניות יגיעו אליך במייל בלבד."
          />

          <CheckboxWithLabel
            name="showPhone"
            label="אני מאשר.ת להציג את מספר הטלפון שלי בפרופיל באתר"
          />
        </div>

        <div className="form-field-column">
          <MultiSelectDropdown
            name="serviceAreas"
            label="אזור שירות"
            required
            options={[]} // נטען בעתיד
            allowCustom={false}
          />

          <TextField
            name="email"
            label="אימייל ליצירת קשר"
            hint={`המייל לא מוצג בפרופיל. רק נעביר לשם פניות מההורים.\n\n`}
            type="email"
          />
        </div>
      </div>
    </section>
  );
}
