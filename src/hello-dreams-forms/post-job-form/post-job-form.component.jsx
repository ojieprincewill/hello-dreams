import { React, useState } from "react";

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    type: "Post a job",
    name: "",
    email: "",
    phone: "",
    socialMediaLink: "",
    socialMediaPlatforms: "",
    services: "",
    competitors: "",
    brandStyleGuide: "",
    socialMediaGoals: "",
    howDidYouHear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Post a Job
      </p>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Post your job in front of top-tier creative talent. A one-time fee of{" "}
        <span className="font-bold">₦50,000</span> is required to submit your
        listing. Once your job is submitted and payment is confirmed, it will be
        reviewed and published on our platform within{" "}
        <span className="font-bold">24 hours</span>.
      </p>

      <form className="w-full space-y-8 text-[#000000] md:p-6 ">
        <div className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8">
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Job Title <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g., Graphic designer"
              className="w-full placeholder:text-[#667085] placeholder:text-[14px] p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Experience Level <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Work Hours <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Pay Type <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Job Description <span class="text-red-500">*</span>
          </label>
          <textarea
            name=""
            value=""
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Application Instructions <span class="text-red-500">*</span>
          </label>
          <textarea
            name=""
            value=""
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm "
          />
          <span className="mt-2 text-[#667085] text-[11px]">
            (e.g., Send your portfolio to email@example.com or apply via
            website.)
          </span>
        </div>

        <div className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8">
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Company Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div className="space-y-5 md:space-y-10">
            <div>
              <label
                className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
                aria-required
              >
                Company Email <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
                name=""
                value=""
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
              >
                Post job
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
