import { React, useState } from "react";
import supabase from "../../supabase/client";
import MentorshipSuccess from "./mentorship-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const MentorshipForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    type: "Hello dreams mentorship",
    name: "",
    email: "",
    phone: "",
    data: {
      socialMediaLink: "",
      socialMediaPlatforms: "",
      services: "",
      competitors: "",
      brandStyleGuide: "",
      socialMediaGoals: "",
      howDidYouHear: "",
      mentorshipFormat: "",
      duration: "",
      goals: "",
      field: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { name, email, phone, mentorshipFormat, goals } = formData;

    // Validate required fields
    if (!name || !email || !phone || !mentorshipFormat || !goals) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-service-enquiries",
        {
          body: formData,
        }
      );

      if (error) {
        throw error;
      }

      setSuccess(
        "Thank you! Your mentorship application has been submitted successfully."
      );
      setFormData({
        type: "Hello dreams mentorship",
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
        mentorshipFormat: "",
        duration: "",
        goals: "",
        field: "",
      });
      setLoading(false);
    } catch (err) {
      console.error("Error: ", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return success ? (
    <MentorshipSuccess />
  ) : (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Hello Dreams Mentorship
      </motion.p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8 text-[#000000] md:p-6 "
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
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Paste LinkedIn profile link
          </label>
          <input
            type="url"
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            name="socialMediaLink"
            value={formData.socialMediaLink}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-profile"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Preferred mentorship format <span className="text-red-500">*</span>
          </label>
          <select
            name="mentorshipFormat"
            value={formData.mentorshipFormat}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            required
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="1:1 sessions">1:1 sessions</option>
            <option value="Group sessions">Group sessions</option>
            <option value="Chat-based">Chat-based</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Duration of the mentorship
          </label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
            <option value="3 Months">3 Months</option>
          </select>
        </div>
        <div>
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            What are your top 1-3 goals for mentorship?{" "}
            <span className="text-red-500">*</span>
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
            required
          />
        </div>
        <div className="space-y-5 md:space-y-10">
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Choose mentorship field
            </label>
            <select
              name="field"
              value={formData.field}
              onChange={handleChange}
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled className="">
                Select an option
              </option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

export default MentorshipForm;
