import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const OurPackages = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full lg:h-[800px] bg-gradient-to-b from-[#010413] to-[#ffffff] p-3 lg:p-5 my-10">
      <p
        className="text-[24px] lg:text-[48px] text-[#f7f7f7] text-center mb-4"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Pricing
      </p>
      <p
        className="text-[12px] lg:text-[17px] text-[#f7f7f7] font-medium lg:font-bold text-center mb-5 lg:mb-7"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        No contracts or hidden costs, pause or cancel anytime.
        <br />
        Each package comes with a design lead.
      </p>

      <div className="flex flex-col space-y-3 md:flex-row justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#fff] p-2 md:p-3 lg:py-5 lg:px-10 rounded-2xl md:rounded-none md:rounded-tl-2xl md:rounded-bl-2xl overflow-hidden w-full md:w-[230px] lg:w-[411px]"
        >
          <p className="text-[#010413] text-[12.41px] lg:text-[20px] font-bold mb-4 lg:mb-6 uppercase">
            one-time projects
          </p>
          <div className="space-y-3 lg:space-y-6">
            <p className="text-[#667085] text-[10px] lg:text-[15px] leading-[1.5]">
              Comprehensive Statement of Work outlining all deliverables
            </p>
            <p className="text-[#667085] text-[10px] lg:text-[15px] leading-[1.5]">
              50% upfront, 25% upon design approval, 25% on final delivery
            </p>
            <p className="text-[#667085] text-[10px] lg:text-[15px] leading-[1.5]">
              Structured delivery plan over 4-12 weeks
            </p>
            <p className="text-[#667085] text-[10px] lg:text-[15px] leading-[1.5]">
              Full project oversight handled by a design lead
            </p>
            <p className="text-[#667085] text-[10px] lg:text-[15px] leading-[1.5]">
              2-3 Specialised design professionals with a design lead
            </p>
          </div>
          <Link
            to="/services/ui-design-consultation"
            className="flex justify-center items-center mt-5"
            onClick={handleOrigins}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }} // ✅ Image pops in
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#efece9] text-[#101828] font-bold border border-[#efece9] text-[10px] lg:text-[15px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Book a free Consultation
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#1342ff] p-2 md:p-3 lg:py-5 lg:px-10 rounded-2xl overflow-hidden md:w-[230px] lg:w-[411px]"
        >
          <p className="text-[#f7f7f7] text-[12.41px] lg:text-[20px] font-bold mb-4 lg:mb-6 uppercase">
            monthly retainers
          </p>
          <div className="space-y-3 lg:space-y-6">
            <p className="text-[#f7f7f7] text-[10px] lg:text-[15px] leading-[1.5]">
              Work with a dedicated design team and project manager
            </p>
            <p className="text-[#f7f7f7] text-[10px] lg:text-[15px] leading-[1.5]">
              Fixed monthly rate, no hidden fees — scale up or down anytime
            </p>
            <p className="text-[#f7f7f7] text-[10px] lg:text-[15px] leading-[1.5]">
              Keep momentum with quick and efficient delivery cycles
            </p>
            <p className="text-[#f7f7f7] text-[10px] lg:text-[15px] leading-[1.5]">
              We work within your preferred tools—Slack, Notion, or any platform
              you choose
            </p>
            <p className="text-[#f7f7f7] text-[10px] lg:text-[15px] leading-[1.5]">
              2-3 Specialised design professionals with a design lead
            </p>
            <p className="text-[#f7f7f7] text-[10px] lg:text-[15px] leading-[1.5]">
              Pause and resume work anytime within a 30-day window
            </p>
          </div>
          <Link
            to="/services/ui-design-consultation"
            className="flex justify-center items-center mt-5"
            onClick={handleOrigins}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }} // ✅ Image pops in
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-[#efece9] text-[#101828] font-bold border border-[#efece9] text-[10px] lg:text-[15px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#101828] hover:border-[#101828] transition-colors duration-300 cursor-pointer"
            >
              Book a free Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OurPackages;
