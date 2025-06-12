import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoachLanding from '../pages/CoachLanding';
import CoachSignupForm from '../pages/CoachSignupForm';
import CoachDashboard from '../pages/CoachDashboard';
import HomeParentLanding from '../pages/HomeParentLanding';
import ParentForm from '../pages/ParentForm';
import ContactForm from '../pages/ContactForm';
import Message48Hours from '../pages/Message48Hours';
import ProfileForm from '../pages/profile/ProfileForm';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeParentLanding />} />
        <Route path="/coach" element={<CoachLanding />} />
        <Route path="/coach-signup" element={<CoachSignupForm />} />
        <Route path="/dashboard" element={<CoachDashboard />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/parent-form" element={<ParentForm />} />
        <Route path="/message" element={<Message48Hours />} />
        <Route path="/profile-form" element={<ProfileForm />} />
      </Routes>
    </Router>
  );
}
