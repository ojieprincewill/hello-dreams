import React from "react";
import GeneralForm from "../../hello-dreams-forms/general-form/general-form.component";

const SolutionsSection = () => {
  return (
    <div className="hidden md:block bg-[#010413] text-[#fff] px-10 py-20">
      <h1 className="text-[48px] semibold leading-[1.5] text-center">
        We would love to provide you with a solution
        <br />
        for your current professional pain points
      </h1>
      <GeneralForm />
    </div>
  );
};

export default SolutionsSection;
