import {React, useState} from "react";
import supabase from "../../supabase/client";

const PrintingConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    service: "",
    accompanyingServices: "",
    howDidYouHear: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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

    const { name, email, phone, company, message, service, accompanyingServices, howDidYouHear } = formData;
    if (!name || !email || !phone || !service) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    
    const payload = {
      type: "Printing Consultation",
      name,
      email,
      phone,
      data: {company,
      message,
      service,
      accompanyingServices,
      howDidYouHear,}
    };

    try {
      const { data, error } = await supabase.functions.invoke("handle-service-enquiries", {
        body: payload,
      });

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
        selectService: "",
        accompanyingServices: "",
        howDidYouHear: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    };
  };
  
  return (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Get a free consultation
      </p>
      <p
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Please provide the details below
      </p>
      <form 
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8 text-[#000000] md:p-6 ">
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
          <span className="mt-2 text-[#161616] text-[11px]">
            Tell us a bit about your project and what you hope to achieve
          </span>
        </div>
        <div className="space-y-5 md:space-y-10">
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Select service <span class="text-red-500">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled className="">
                Select an option
              </option>
              <option value="service1">Option 1</option>
              <option value="service2">Option 2</option>
              <option value="service3">Option 3</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Choose accompanying services <span class="text-red-500">*</span>
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
              <option value="service1">Option 1</option>
              <option value="service2">Option 2</option>
              <option value="service3">Option 3</option>
            </select>
          </div>
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
            <option value="" disabled className="">
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
            className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
      </form>
    </div>
  );
};

export default PrintingConsultationForm;
