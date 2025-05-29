import { React, useState } from "react";
import supabase from "../../supabase/client";

const ReferForm = () => {
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    data: {
      referralName: "",
      referralEmail: "",
    },
    referralCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const generateReferralCode = (length = 6) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

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

    console.log("Form Data on Submit:", formData);

    const { service, name, email, data, referralCode } = formData;
    if (
      !service ||
      !name ||
      !email ||
      !data.referralName ||
      !data.referralEmail
    ) {
      setError(
        "Please fill in all required fields, including referral details."
      );
      setLoading(false);
      return;
    }
    if (!referralCode) {
      setError("Please generate your referral code first.");
      setLoading(false);
      return;
    }

    const payload = {
      service,
      name,
      email,
      referralCode,
      data: data,
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "referral-handler",
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
        service: "",
        name: "",
        email: "",
        data: {
          referralName: "",
          referralEmail: "",
        },
        referralCode: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReferralDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
  };

  const handleGenerateAndShowCode = () => {
    const code = generateReferralCode();
    setGeneratedCode(code);
    setFormData((prev) => ({
      ...prev,
      referralCode: code,
    }));
    setShowModal(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => {
        alert("Referral code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
        alert("Failed to copy code. Please try manually.");
      });
  };

  return (
    <div className="px-[5%] md:px-[10%] py-10">
      <p
        className="text-[#667085] text-[12px] md:text-[19.54px] lg:text-[24px] text-center font-bold md:w-[480px] mx-auto mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Earn Rewards with Our Refer and Earn Program
      </p>
      <p
        className="text-[#010413] text-[24px] md:text-[39.09px] lg:text-[48px] text-center lg:w-[840px] mx-auto mb-5"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Share the Benefits and Get Rewarded for Every Referral
      </p>
      <p
        className="text-[#667085] text-[12px] md:text-[13.1px] lg:text-[16px] text-center mb-5"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Make up to 10% on commission for every referral of any of our services.
      </p>
      <p
        className="text-[#000000] text-[24.15px] md:text-[36.02px] lg:text-[40px] text-center font-bold mt-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Step 1: Generate Your Code
      </p>
      <div className="w-full md:w-[401.75px] mx-auto flex flex-col items-center space-y-4 mt-3">
        <button
          type="button"
          onClick={handleGenerateAndShowCode}
          className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[12px] md:text-[14px] lg:text-[16px] px-6 py-3 rounded-lg hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
        >
          {formData.referralCode
            ? "Re-generate Code"
            : "Generate My Referral Code"}
        </button>
        {formData.referralCode && (
          <p className="text-sm text-gray-600">
            Your current code: {formData.referralCode} (Click above to
            re-generate and copy)
          </p>
        )}
      </div>

      <p
        className="text-[#000000] text-[24.15px] md:text-[36.02px] lg:text-[40px] text-center font-bold mt-10"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Step 2: Enter Referral Details
      </p>
      <form
        onSubmit={handleSubmit}
        className="md:w-[401.75px] mx-auto space-y-8 md:p-6 mt-3 "
      >
        <div>
          <label
            className="block text-[#475569] text-[12px] text-center md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Select Service <span class="text-red-500">*</span>
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          >
            <option value="" disabled className="text-[#b2b2b2]">
              Select a service you are referring
            </option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">Tiktok</option>
            <option value="linkedin">LinkedIn</option>
            <option value="x-twitter">X (Former Twitter)</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Referral Name (Business or Personal){" "}
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="referralName"
            value={formData.data.referralName}
            onChange={handleReferralDataChange}
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-required
          >
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-required
          >
            Your Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label
            className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
            aria-required
          >
            Referral Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="referralEmail"
            value={formData.data.referralEmail}
            onChange={handleReferralDataChange}
            className="w-full p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-3 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            {loading ? "Submitting..." : "Send Referral"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 text-[#010413]">
              Your Referral Code
            </h3>
            <p
              className="text-center text-2xl font-mono bg-gray-100 p-3 rounded my-4 break-all"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {generatedCode}
            </p>
            <div className="flex justify-between space-x-3 mt-6">
              <button
                onClick={handleCopyCode}
                className="flex-1 bg-[#1342ff] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Copy Code
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferForm;
