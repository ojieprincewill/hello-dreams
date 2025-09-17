import React, { useState } from "react";
import supabase from "../../supabase/client";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import UiConsultationSuccess from "./ui-consultation-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { isEmail, isPhone, required, minLength, validateForm as runValidation } from "@/utils/validation";

const UiConsultationForm = () => {
  const consultationType = useSelector((state) => state.consultation.type);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    howDidYouHear: "",
    type: "UI/UX Design",
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

    const { type, ...rest } = formData;

    const payload = {
      type,
      name,
      email,
      phone,
      projectModel: consultationType,
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
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        howDidYouHear: "",
        type: "UI/UX Design",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return success ? (
    <UiConsultationSuccess />
  ) : (
    <div className="bg-[#f8f8f8] xl:bg-[#fff] w-full px-[5%] py-15 md:py-25">
      {loading && <LoadingSpinner />}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center xl:text-[64px] font-bold mb-10 md:mb-20"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Get a Free Consultation with Our Expert UI/UX Designers
        <br />
        {consultationType === "one-time project"
          ? "(One-Time Project)"
          : "(Monthly Retainer)"}
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:gap-x-20 space-y-8 text-[#000000] md:p-6"
      >
        <input type="hidden" name="type" value="UI/UX Design" />

        <div>
          <label className="block text-sm font-medium mb-3">
            Name <span className="text-red-500">*</span>
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
          <label className="block text-sm font-medium mb-3">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
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
          <label className="block text-sm font-medium mb-3">
            Phone number <span className="text-red-500">*</span>
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
          <label className="block text-sm font-medium mb-3">Company name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Message <span className="text-red-500">*</span>
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

        <div>
          <label className="block text-sm font-medium mb-3">
            How did you hear about us?
          </label>
          <select
            name="howDidYouHear"
            value={formData.howDidYouHear}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-10 text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            {loading ? "Submitting..." : "Schedule My Free Consultation"}
          </button>

          {error && <p className="text-red-600 mt-4">{error}</p>}
          {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
      </motion.form>
    </div>
  );
};

export default UiConsultationForm;
