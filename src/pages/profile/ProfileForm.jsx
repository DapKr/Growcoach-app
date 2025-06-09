import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ContactDetailsSection from './sections/ContactDetailsSection';
import ProfessionalExperienceSection from './sections/ProfessionalExperienceSection';
import ConsentSection from './sections/ConsentSection';
import CTAButton from '../../components/CTAButton/CTAButton';
import TextButton from '../../components/TextButton/TextButton';
import '../../styles/form.css';

const DRAFT_KEY = 'profileFormDraft';

export default function ProfileForm() {
  // Load draft from localStorage if present
  const draft = localStorage.getItem(DRAFT_KEY);
  const defaultValues = draft
    ? JSON.parse(draft)
    : {
        fullName: '',
        email: '',
        phone: '',
        showPhone: false,
        serviceAreas: [],
        profileImage: [],
        certificates: [],
        expertise: [],
        customExpertise: '',
        experienceYears: '',
        approach: [],
        customApproach: '',
        meetingType: [],
        customMeetingType: '',
        about: '',
        additionalLinks: [''],
        reviews: [''],
        consentProfile: false,
        consentContact: false,
      };

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  // If draft changes in localStorage, update the form
  useEffect(() => {
    if (draft) {
      reset(JSON.parse(draft));
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => {
    console.log('✔️ Data submitted:', data);
    // TODO: validate file size/types
    // TODO: send to backend or go to preview page
    // Optionally clear draft on submit
    localStorage.removeItem(DRAFT_KEY);
  };

  const handleSaveDraft = () => {
    const data = methods.getValues();
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    console.log('💾 Draft saved:', data);
  };

  return (
    <FormProvider {...methods}>
      <div className="profile-form-container" dir="rtl">
        <h1 className="profile-form-title">יצירת פרופיל מדריך</h1>

        <form
          className="form-sections-container"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <ContactDetailsSection />
          <ProfessionalExperienceSection />
          <ConsentSection />

          <div className="profile-form-actions">
            <CTAButton type="submit">הקמת פרופיל</CTAButton>
            <TextButton onClick={handleSaveDraft} color="primary">
              שמירה כטיוטה
            </TextButton>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
