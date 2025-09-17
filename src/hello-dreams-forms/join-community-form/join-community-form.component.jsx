import React, { useState } from "react";
import supabase from "../../supabase/client";
import JoinCommunitySuccess from "./join-community-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { isEmail, isPhone, required, minLength, validateForm as runValidation } from "@/utils/validation";

const JoinCommunityForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
    source: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
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
      setError("Please fix the highlighted errors");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "join-community-form-handler",
        {
          body: formData,
        }
      );

      if (error) {
        throw error;
      }

      setSuccess(
        "Thank you! Your application has been submitted successfully."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        message: "",
        source: "",
      });
      setLoading(false);
    } catch (err) {
      console.error("Error: ", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return success ? (
    JoinCommunitySuccess
  ) : (
    <div className="bg-[#f8f8f8] xl:bg-[#fff] w-full px-[5%] xl:px-[10%] py-15 md:py-25">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center xl:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Join Community
      </motion.p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}{" "}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {!success ? (
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:gap-x-20 space-y-8 text-[#000000] md:p-6 "
        >
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              required
            />
            {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              required
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              required
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Paste LinkedIn profile link
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
              required
            />
            {fieldErrors.message && <p className="text-red-500 text-xs mt-1">{fieldErrors.message}</p>}
            <span className="mt-2 text-[#161616] text-[11px]">
              Tell us why you want to join hello dreams community
            </span>
          </div>
          <div className="space-y-10">
            <div>
              <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
                How did you hear about us?
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              >
                <option value="" disabled className="">
                  Select an option
                </option>
                <option value="google">Google search</option>
                <option value="referral">From a friend</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">Youtube</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Join Community"}
              </button>
            </div>
          </div>
        </motion.form>
      ) : (
        <JoinCommunitySuccess />
      )}
    </div>
  );
};

export default JoinCommunityForm;
