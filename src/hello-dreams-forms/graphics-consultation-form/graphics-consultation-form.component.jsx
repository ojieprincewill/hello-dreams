import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../../supabase/client";

const GraphicsConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Graphics Design",
    email: "",
    phone: "",
    company: "",
    message: "",
    service: "",
    accompanyingService: "",
    howDidYouHear: "",
  });
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.service) newErrors.service = "Service selection is required";
    if (!formData.accompanyingService)
      newErrors.accompanyingService =
        "Accompanying service selection is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccess(null);

    const { type, name, email, phone, ...rest } = formData;

    const payload = {
      type,
      name,
      email,
      phone,
      data: rest,
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-service-enquiries",
        {
          body: payload,
        }
      );

      if (error) {
        console.error("Supabase Error:", error.message || error);
        toast.error("Submission failed. Please try again.");
        return;
      }

      toast.success("Your enquiry has been submitted!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        service: "",
        accompanyingService: "",
        howDidYouHear: "",
        type: "Graphics Design",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Get a free consultation for our Graphics & Branding Services
      </p>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Please provide the details below
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20 space-y-8 text-[#000000] md:p-6"
      >
        <div>
          <input type="hidden" name="type" value="Graphics Design" />
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
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
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
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
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
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
          <span className="mt-2 text-[#161616] text-[11px]">
            Tell us a bit about your project and what you hope to achieve
          </span>
        </div>
        <div className="space-y-5 md:space-y-10">
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Select service <span className="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="service1">Option 1</option>
              <option value="service2">Option 2</option>
              <option value="service3">Option 3</option>
            </select>
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service}</p>
            )}
          </div>
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Choose accompanying services{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="accompanyingService"
              value={formData.accompanyingService}
              onChange={handleChange}
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="service1">Option 1</option>
              <option value="service2">Option 2</option>
              <option value="service3">Option 3</option>
            </select>
            {errors.accompanyingService && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accompanyingService}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            How did you hear about us?
          </label>
          <select
            name="howDidYouHear"
            value={formData.referral}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="service1">Option 1</option>
            <option value="service2">Option 2</option>
            <option value="service3">Option 3</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Schedule My Free Consultation"}
          </button>

          {errors && <p className="text-red-600 mt-4">{errors}</p>}
          {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
      </form>
    </div>
  );
};

export default GraphicsConsultationForm;
