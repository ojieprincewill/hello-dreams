import React, { useState } from "react";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";

const UiConsultationForm = () => {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    message: "",
    publicityChannel: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, phoneNumber, companyName, message, publicityChannel } =
      details;

    setLoading(true);

    const response = await fetch(
      "https://vpwzqxrkyawljqrrvolj.supabase.co/functions/v1/handle-service-enquiries",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: { name },
          email: { email },
          phoneNumber: { phoneNumber },
          companyName: { companyName },
          message: { message },
          publicityChannel: { publicityChannel },
        }),
      },
      console.log(response)
    );

    setLoading(false);

    setDetails({
      name: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      message: "",
      publicityChannel: "",
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const { name, email, phoneNumber, companyName, message, publicityChannel } =
    details;

  return (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] py-15 md:py-25">
      {loading && <LoadingSpinner />}
      <p
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-10 md:mb-20"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Get a Free Consultation with Our Expert UI/UX Designers
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8 text-[#000000] md:p-6 "
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
            value={name}
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
            value={email}
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
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            value={companyName}
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
            value={message}
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
          <span className="mt-2 text-[#161616] text-[11px]">
            Tell us a bit about your project and what you hope to achieve
          </span>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            How did you hear about us?
          </label>
          <select
            name="publicityChannel"
            value={publicityChannel}
            onChange={handleChange}
            className="w-full text-[#010413] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Instagram</option>
            <option value="service2">LinkedIn</option>
            <option value="service3">Word of mouth</option>
          </select>
          <div>
            <button
              type="submit"
              className="bg-[#1342ff] w-full lg:bg-[#010413] text-[#f7f7f7] font-semibold border border-[#1342ff] lg:border-[#010413] mt-10 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-3xl lg:rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Schedule My Free Consultation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UiConsultationForm;
