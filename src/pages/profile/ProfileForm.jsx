import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import ContactDetailsSection from './sections/ContactDetailsSection';
import ProfessionalExperienceSection from './sections/ProfessionalExperienceSection';
import ConsentSection from './sections/ConsentSection';
import { CTAButton } from '../../components/CTAButton/CTAButton';
import '../../styles/form.css';

export default function ProfileForm() {
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
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
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log('✔️ Data submitted:', data);
    // TODO: validate file size/types
    // TODO: send to backend or go to preview page
  };

  const handleSaveDraft = () => {
    const data = methods.getValues();
    console.log('💾 Draft saved:', data);
    // TODO: save to localStorage or backend draft
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
            <button
              type="button"
              className="draft-button"
              onClick={handleSaveDraft}
            >
              שמירה כטיוטה
            </button>
            <CTAButton type="submit">הקמת פרופיל</CTAButton>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
