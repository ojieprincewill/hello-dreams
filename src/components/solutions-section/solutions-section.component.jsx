import React from "react";
import GeneralForm from "../../hello-dreams-forms/general-form/general-form.component";

const SolutionsSection = () => {
  return (
    <div className="hidden md:block bg-[#010413] text-[#fff] md:px-5 lg:px-10 py-10 lg:py-20">
      <h1 className="md:text-[30px] lg:text-[48px] semibold leading-[1.5] text-center md:w-[615.85px] lg:w-[90%] md:mx-auto">
        We would love to provide you with a solution for your current
        professional pain points
      </h1>
      <GeneralForm />
    </div>
  );
};

export default SolutionsSection;
