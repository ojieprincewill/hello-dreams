import React, { useState } from "react";
import supabase from "../../supabase/client";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import DevConsultationSuccess from "./dev-consultation-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { isEmail, isPhone, required, minLength, validateForm as runValidation } from "@/utils/validation";

const WebDevConsultationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "Web Development",
    selectedService: "",
    selectedCategory: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    accompanyingServices: "",
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

    if (name === "selectedService") setStep(2);
    if (name === "selectedCategory") setStep(3);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    setFieldErrors({});

    const {
      name,
      email,
      phone,
      company,
      message,
      accompanyingServices,
      howDidYouHear,
      selectedService,
      selectedCategory,
    } = formData;
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
      message: [
        { rule: required, message: "Message is required" },
        { rule: minLength(10), message: "Message should be at least 10 characters" },
      ],
    };
    const validation = runValidation(schema, formData);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setError(Object.values(validation.errors)[0] || "Please fix the highlighted errors.");
      setLoading(false);
      return;
    }

    const payload = {
      type: formData.type,
      selectedService,
      selectedCategory,
      name,
      email,
      phone,
      message,
      data: {
        company,
        accompanyingServices,
        howDidYouHear,
      },
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
        setError("Submission failed. Please try again later.");
        return;
      }

      setSuccess("Your enquiry has been submitted!");
      setFormData({
        type: "Web Development",
        selectedService: "",
        selectedCategory: "",
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        accompanyingServices: "",
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
    <DevConsultationSuccess />
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
        Get a Quote
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center xl:text-[18px] mb-10 xl:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {step === 1 || step === 2
          ? "Choose a service"
          : "Please complete the details below"}
      </motion.p>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full md:w-[450px] xl:w-[576px] space-y-5 md:mx-auto mt-5 mb-30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <label className="flex items-center bg-[#eef2fe] border border-[#eaecf0] px-4 py-5 rounded-md cursor-pointer space-x-3">
            <input
              type="radio"
              name="selectedService"
              value="Mobile App"
              onChange={handleChange}
              className="w-4 h-4 md:w-5 md:h-5 rounded-sm accent-[#1342ff] bg-[#fff] border border-[#eaecf0] appearance-none checked:bg-[#1342ff] checked:border-[#1342ff] checked:after:content-['✔'] checked:after:text-white checked:after:text-[13px] checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <span className="text-[#010413] text-[14px] md:text-[16px] text-center font-bold">
              Mobile App
            </span>
          </label>
          <label className="flex items-center bg-[#eef2fe] border border-[#eaecf0] px-4 py-5 rounded-md cursor-pointer space-x-3">
            <input
              type="radio"
              name="selectedService"
              value="Website"
              onChange={handleChange}
              className="w-4 h-4 md:w-5 md:h-5 rounded-sm accent-[#1342ff] bg-[#fff] border border-[#eaecf0] appearance-none checked:bg-[#1342ff] checked:border-[#1342ff] checked:after:content-['✔'] checked:after:text-white checked:after:text-[13px] checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <span className="text-[#010413] text-[14px] md:text-[16px] text-center font-bold">
              Website
            </span>
          </label>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full md:w-[450px] xl:w-[576px] space-y-5 md:mx-auto mt-5 mb-30"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <label className="flex items-center bg-[#eef2fe] border border-[#eaecf0] px-4 py-5 rounded-md cursor-pointer space-x-3">
            <input
              type="radio"
              name="selectedCategory"
              value="Business"
              onChange={handleChange}
              className="w-4 h-4 md:w-5 md:h-5 rounded-sm accent-[#1342ff] bg-[#fff] border border-[#eaecf0] appearance-none checked:bg-[#1342ff] checked:border-[#1342ff] checked:after:content-['✔'] checked:after:text-white checked:after:text-[13px] checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <span className="text-[#010413] text-[14px] md:text-[16px] text-center font-bold">
              Business
            </span>
          </label>
          <label className="flex items-center bg-[#eef2fe] border border-[#eaecf0] px-4 py-5 rounded-md cursor-pointer space-x-3">
            <input
              type="radio"
              name="selectedCategory"
              value="Personal"
              onChange={handleChange}
              className="w-4 h-4 md:w-5 md:h-5 rounded-sm accent-[#1342ff] bg-[#fff] border border-[#eaecf0] appearance-none checked:bg-[#1342ff] checked:border-[#1342ff] checked:after:content-['✔'] checked:after:text-white checked:after:text-[13px] checked:after:flex checked:after:justify-center checked:after:items-center"
            />
            <span className="text-[#010413] text-[14px] md:text-[16px] text-center font-bold">
              Personal
            </span>
          </label>
        </motion.div>
      )}

      {step === 3 && (
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>
            )}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
            {fieldErrors.phone && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
            )}
          </div>
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Company name (Optional)
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Message <span class="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
            />
            {fieldErrors.message && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>
            )}
            <span className="mt-2 text-[#161616] text-[11px]">
              Tell us a bit about your project and what you hope to achieve
            </span>
          </div>
          <div className="space-y-5 md:space-y-10">
            <div>
              <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
                Choose accompanying services
              </label>
              <select
                name="accompanyingServices"
                value={formData.accompanyingServices}
                onChange={handleChange}
                className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              >
                <option value="" disabled className="">
                  Select an option
                </option>
                <option value="service1">Business Cards</option>
                <option value="service2">Flyers and Brochures</option>
                <option value="service3">Posters and Banners</option>
                <option value="service4">Company Souvenirs</option>
                <option value="service5">Custom Prints</option>
                <option value="service6">Brochures</option>
                <option value="service7">Menus</option>
                <option value="service8">Labels and Stickers</option>
                <option value="service9">Notepads and Stationery</option>
                <option value="service10">Others</option>
              </select>
            </div>
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
                <option value="" disabled>
                  Select an option
                </option>
                <option value="google">Google search</option>
                <option value="referral">From a friend</option>
                <option value="social">LinkedIn</option>
                <option value="social">Instagram</option>
                <option value="social">Youtube</option>
              </select>
            </div>
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
        </motion.form>
      )}
    </div>
  );
};

export default WebDevConsultationForm;
