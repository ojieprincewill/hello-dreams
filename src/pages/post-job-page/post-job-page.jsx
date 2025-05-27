import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import PostJobForm from "../../hello-dreams-forms/post-job-form/post-job-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const PostJobPage = () => {
  return (
    <>
      <NavBar />
      <PostJobForm />
      <FooterSection />
    </>
  );
};

export default PostJobPage;
