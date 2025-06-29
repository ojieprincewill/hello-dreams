import React from 'react';
import NavBar from '../../components/landing-header/nav-bar/nav-bar.component';
import FooterSection from '../../components/footer-section/footer-section.component';
import LetsTalk from '../../components/lets-talk/lets-talk.component';
import ContactSuccess from '../../components/lets-talk/contact-success.component';

const BookCallPage = () => {
  return (
    <>
      <NavBar />
      <LetsTalk />
      <FooterSection />
    </>
  );
};

export default BookCallPage;
