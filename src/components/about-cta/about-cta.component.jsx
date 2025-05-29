import React from "react";
import GeneralForm from "../../hello-dreams-forms/general-form/general-form.component";

const AboutCta = () => {
  return (
    <div className="hidden md:block bg-[#010413] text-[#fff] px-10 py-20">
      <h1 className="text-[48px] semibold leading-[1.5] text-center">
        Ready to change your strategy?
      </h1>
      <GeneralForm />
    </div>
  );
};

export default AboutCta;
