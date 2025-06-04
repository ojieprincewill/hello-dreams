import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import PostJobForm from "../../hello-dreams-forms/post-job-form/post-job-form.component";
import FooterSection from "../../components/footer-section/footer-section.component";
import PostJobSuccess from "../../hello-dreams-forms/post-job-form/post-job-success.component";

const PostJobPage = () => {
  return (
    <>
      <NavBar />
      <PostJobForm />
      <PostJobSuccess />
      <FooterSection />
    </>
  );
};

export default PostJobPage;
