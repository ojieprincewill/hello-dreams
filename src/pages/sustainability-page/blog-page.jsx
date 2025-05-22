import React from "react";
import NavBar from "../../components/landing-header/nav-bar/nav-bar.component";
import BlogContent from "../../components/sustainability-content/blog-content/blog-content.component";
import FooterSection from "../../components/footer-section/footer-section.component";

const BlogPage = () => {
  return (
    <>
      <NavBar />
      <BlogContent />
      <FooterSection />
    </>
  );
};

export default BlogPage;
