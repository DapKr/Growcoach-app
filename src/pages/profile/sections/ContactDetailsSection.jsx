import React, { useEffect, useState } from 'react';
import TextField from '../../../components/form/FormInputs/TextField';

import MultiSelectDropdown from '../../../components/form/FormInputs/MultiSelectDropdown';
import ProfileImageUpload from '../../../components/form/ProfileImageUpload/ProfileImageUpload';

export default function ContactDetailsSection() {
  const [serviceAreaOptions, setServiceAreaOptions] = useState([
    {
      label: 'שירות כללי',
      options: [
        { value: 'online', label: 'אונליין' },
        { value: 'all-country', label: 'כל הארץ' },
      ],
    },
    {
      label: 'מחוז',
      options: [
        { value: 'north', label: 'צפון' },
        { value: 'haifa', label: 'חיפה' },
        { value: 'center', label: 'מרכז' },
        { value: 'jerusalem', label: 'ירושלים' },
        { value: 'south', label: 'דרום' },
        { value: 'shomron', label: 'שומרון ובקעה' },
      ],
    },
  ]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(
          'https://data.gov.il/api/3/action/datastore_search?resource_id=b7cf8f14-64a2-4b33-8d4b-edb286fdbd37&limit=5000'
        );
        const data = await res.json();
        const cityOptions = data.result.records.map((city) => ({
          value: city['שם_ישוב'],
          label: city['שם_ישוב'],
        }));

        setServiceAreaOptions((prev) => {
          const alreadyHasCities = prev.some(
            (group) => group.label === 'יישובים'
          );
          if (alreadyHasCities) return prev;

          return [...prev, { label: 'יישובים', options: cityOptions }];
        });
      } catch (err) {
        console.error('שגיאה בטעינת רשימת היישובים:', err);
      }
    };

    fetchCities();
  }, []);

  const filterOption = (candidate, input) => {
    if (!input) return true;
    return candidate.label.includes(input); // case-sensitive substring match
  };

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

        <div className="form-field-row">
          <TextField name="fullName" label="שם מלא" required />

          <TextField
            name="phone"
            label="טלפון"
            type="tel"
            required
            hint="כחלק מתהליך האימות- אנו מבקשים מספר טלפון. הוא לא יוצג בפרופיל."
            hintPosition="below"
          />

          <MultiSelectDropdown
            name="serviceAreas"
            label="אזור שירות"
            required
            options={serviceAreaOptions}
            allowCustom={false}
            filterOption={filterOption}
          />
        </div>
      </div>
    </section>
  );
}
