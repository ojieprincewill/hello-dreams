import { React, useState, useEffect } from "react";
import supabase from "../../supabase/client";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import SocialConsultationSuccess from "./social-consultation-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { isEmail, isPhone, required, minLength, validateForm as runValidation } from "@/utils/validation";

const SocialConsultationForm = () => {
  const [formData, setFormData] = useState({
    type: "Social Media Management",
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    setFieldErrors({});

    const { name, email, phone, socialMediaGoals, socialMediaPlatforms } =
      formData;
    const schema = {
      name: [
        { rule: required, message: "Name is required" },
        { rule: minLength(2), message: "Name must be at least 2 characters" },
      ],
      email: [
        { rule: required, message: "Email is required" },
        { rule: isEmail, message: "Enter a valid email address" },
      ],
      phone: [
        { rule: required, message: "Phone number is required" },
        { rule: isPhone, message: "Enter a valid phone number" },
      ],
      socialMediaPlatforms: [
        { rule: required, message: "Platforms selection is required" },
      ],
      socialMediaGoals: [
        { rule: required, message: "Goals are required" },
        { rule: minLength(10), message: "Goals should be at least 10 characters" },
      ],
    };
    const validation = runValidation(schema, formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setError(Object.values(validation.errors)[0] || "Please fix the highlighted errors.");
      setLoading(false);
      return;
    }

    const { type, ...rest } = formData;

    const payload = {
      type,
      name,
      email,
      phone,
      data: rest, // includes company, message, howDidYouHear, etc.
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-service-enquiries",
        {
          body: payload,
        }
      );

      if (error) {
        const supabaseError = error.message || error;
        console.error("Supabase Error:", supabaseError);
        setError("Submission failed. Please try again.");
        return;
      }

      setSuccess("Your enquiry has been submitted!");
      setFormData({
        type: "Social Media Management",
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
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return success ? (
    <SocialConsultationSuccess />
  ) : (
    <div className="bg-[#f8f8f8] xl:bg-[#fff] w-full px-[5%] xl:px-[10%] py-15 md:py-25">
      {loading && <LoadingSpinner />}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center xl:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Manage Your Social Media
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center xl:text-[18px] mb-10 xl:mb-20 xl:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Please fill out the form below with your social media needs and
        preferences. Once submitted, our team will review your request and get
        back to you within 1 to 5 days.
      </motion.p>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:gap-x-20  space-y-8 text-[#000000] md:p-6 "
      >
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Name <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input type="hidden" name="type" value="Social Media Management" />
          {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Phone number <span class="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Paste your social media account link
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="socialMediaLink"
            value={formData.socialMediaLink}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Social Media Platforms You Want Managed{" "}
            <span class="text-red-500">*</span>
          </label>
          <select
            name="socialMediaPlatforms"
            value={formData.socialMediaPlatforms}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Instagram</option>
            <option value="service2">Tiktok</option>
            <option value="service3">LinkedIn</option>
            <option value="service3">X (Former Twitter)</option>
            <option value="service3">Facebook</option>
          </select>
          {fieldErrors.socialMediaPlatforms && <p className="text-red-500 text-xs mt-1">{fieldErrors.socialMediaPlatforms}</p>}
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Select services
          </label>
          <select
            name="services"
            value={formData.services}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Social Media Strategy Development</option>
            <option value="service2">Content Creation and Curation</option>
            <option value="service3">
              Social Media Posting and Scheduling
            </option>
            <option value="service4">Community Management</option>
            <option value="service5">Analytics and Reporting</option>
            <option value="service6">Social Media Advertising</option>
            <option value="service7">Influencer Marketing</option>
            <option value="service8">Audience Growth and Engagement</option>
            <option value="service9">
              Social Media Account Setup and Optimization
            </option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Any Competitors or Pages You Admire?
          </label>
          <input
            type="text"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="competitors"
            value={formData.competitors}
            onChange={handleChange}
          />
          <span className="mt-2 text-[#161616] text-[11px]">
            Paste a link or input the business/company name
          </span>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Do You Already Have a Brand Style Guide?
          </label>
          <select
            name="brandStyleGuide"
            value={formData.brandStyleGuide}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Yes</option>
            <option value="service2">No</option>
          </select>
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            What Are Your Social Media Goals?{" "}
            <span class="text-red-500">*</span>
          </label>
          <textarea
            name="socialMediaGoals"
            value={formData.socialMediaGoals}
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
          {fieldErrors.socialMediaGoals && <p className="text-red-500 text-xs mt-1">{fieldErrors.socialMediaGoals}</p>}
        </div>
        <div className="space-y-5 md:space-y-10">
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              How did you hear about us?
            </label>
            <select
              name="howDidYouHear"
              value={formData.howDidYouHear}
              onChange={handleChange}
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled className="">
                Select an option
              </option>
              <option value="google">Google search</option>
              <option value="referral">From a friend</option>
              <option value="social">LinkedIn</option>
              <option value="social">Instagram</option>
              <option value="social">Youtube</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              {loading ? "Submitting..." : "Schedule My Free Consultation"}
            </button>
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {success && <p className="text-green-600 mt-4">{success}</p>}
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default SocialConsultationForm;
