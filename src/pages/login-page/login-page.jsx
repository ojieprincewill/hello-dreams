import React from 'react';
import LoginForm from '../../hello-dreams-forms/login-form/login-form';
import NavBar from '../../components/landing-header/nav-bar/nav-bar.component';
import FooterSection from '../../components/footer-section/footer-section.component';

export default function LoginPage() {
  return (
    <>
      <NavBar />
      <div className="h-[60vh]flex items-center justify-center bg-gray-50">
        <LoginForm />
      </div>
      <FooterSection />
    </>
  );
}
