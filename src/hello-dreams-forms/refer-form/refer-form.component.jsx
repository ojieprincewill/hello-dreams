import { React, useState } from "react";
import supabase from "../../supabase/client";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { toast } from "react-toastify";
import ReferSuccess from "./refer-success.component";

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
  const [step, setStep] = useState(1);
  const [codeSeen, setCodeSeen] = useState(false);

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
      const { data: responseData, error: supabaseError } =
        await supabase.functions.invoke("referral-handler", {
          body: payload,
        });

      if (supabaseError) {
        console.error("Supabase Error:", supabaseError);
        setError("Submission failed. Please try again.");
        setLoading(false);
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
      setGeneratedCode("");
      setShowModal(false);
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
    setCodeSeen(true);
    setShowModal(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(generatedCode)
      .then(() => {
        toast.success("Referral code copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
        toast.error("Failed to copy code. Please try manually.");
      });
  };

  const handleStepOneComplete = () => {
    const { service, name, email, data } = formData;
    if (
      !service ||
      !name ||
      !email ||
      !data.referralName ||
      !data.referralEmail
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setStep(2);
  };

  return (
    <div className="px-[5%] md:px-[10%] py-10">
      <p className="text-[#667085] text-[12px] md:text-[19.54px] xl:text-[24px] text-center font-bold md:w-[480px] mx-auto mb-5">
        Earn Rewards with Our Refer and Earn Program
      </p>
      <p className="text-[#010413] text-[24px] md:text-[39.09px] xl:text-[48px] text-center xl:w-[840px] mx-auto mb-5">
        Share the Benefits and Get Rewarded for Every Referral
      </p>
      <p className="text-[#667085] text-[12px] md:text-[13.1px] xl:text-[16px] text-center mb-5">
        Make up to 10% on commission for every referral of any of our services.
      </p>

      {success ? (
        <ReferSuccess />
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="md:w-[450.75px] mx-auto md:p-6 mt-3 "
        >
          {/* step 1 */}
          {step === 1 && (
            <div className="space-y-8">
              <p
                className="text-[#000000] text-[24.15px] md:text-[36.02px] xl:text-[40px] text-center font-bold "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Step 1
              </p>
              <div>
                <label
                  className="block text-[#475569] text-[12px] text-center md:text-[16px] font-medium mb-3 md:mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Select Service <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full text-[#444] text-[10px] md:text-[14px] font-medium p-3 border border-[#dee2e6] bg-transparent focus:outline-none rounded-md"
                >
                  <option value="" disabled hidden className="text-[#b2b2b2]">
                    Select a service you are referring
                  </option>

                  <option value="UI/UX Design" className="text-[#444]">
                    UI/UX Design
                  </option>
                  <option value="Logo Design" className="text-[#444]">
                    Logo Design
                  </option>
                  <option value="Branding" className="text-[#444]">
                    Branding
                  </option>
                  <option value="User Research" className="text-[#444]">
                    User Research
                  </option>
                  <option value="Redesign" className="text-[#444]">
                    Redesign
                  </option>
                  <option value="Development" className="text-[#444]">
                    Development
                  </option>
                  <option value="Printing" className="text-[#444]">
                    Printing
                  </option>
                </select>
              </div>
              <div>
                <label
                  className="block text-[#475569] text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Referral Name (Business or Personal){" "}
                  <span className="text-red-500">*</span>
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

              <div className="w-full md:w-[401.75px] mx-auto flex flex-col items-center space-y-4 mt-3">
                <button
                  type="button"
                  onClick={handleStepOneComplete}
                  className="bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 rounded-lg hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                >
                  {formData.referralCode ? "Resave" : "Save & Continue"}
                </button>
              </div>
            </div>
          )}

          {/* step 2 */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="md:w-max mx-auto space-y-8 md:p-6 mt-3 "
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <p
                className="text-[#000000] text-[24.15px] md:text-[36.02px] xl:text-[40px] text-center font-bold "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Step 2
              </p>
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleGenerateAndShowCode}
                  className="bg-[#ffffff] border border-[#00000015] text-[#010413] text-[12px] md:text-[14px] px-6 md:px-8 py-3 font-medium text-center rounded-2xl shadow-[inset_0px_-2px_4px] shadow-[#ffe7de90] cursor-pointer"
                >
                  <DocumentDuplicateIcon className="inline w-4 h-4 xl:w-5 xl:h-5 align-middle mr-1" />
                  Copy Your Referral Id
                </button>
              </div>
              <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
                <CheckIcon className="inline text-[#1342ff] w-4 h-4 xl:w-5 xl:h-5 align-middle mr-3" />
                Share our “Get a quote” link with your referral
              </p>
              <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
                <CheckIcon className="inline text-[#1342ff] w-4 h-4 xl:w-5 xl:h-5 align-middle mr-3" />
                Ensure your referral submits a quote request
              </p>
              <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
                <CheckIcon className="inline text-[#1342ff] w-4 h-4 xl:w-5 xl:h-5 align-middle mr-3" />
                Assist the company to ensure the deal is closed
              </p>
              <p className="bg-[#f7f7f7] text-[#000000] text-[12px] md:text-[14.38px] px-5 py-4 rounded-md h-[80px] flex items-center">
                <CheckIcon className="inline text-[#1342ff] w-4 h-4 xl:w-5 xl:h-5 align-middle mr-3" />
                When successful, you will get 10%
              </p>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={!codeSeen || loading}
                  className={`bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 rounded-lg transition-colors duration-300 cursor-pointer ${
                    !codeSeen || loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#1342ff] hover:border-[#1342ff]"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.form>
      )}

      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}

      {showModal && (
        <div
          className="fixed inset-0 bg-[#00000050] flex items-center justify-center p-4 z-50"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
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
                className="flex-1 bg-[#1342ff] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
              >
                Copy Code
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-[#eaecf0] text-[#010413] px-4 py-2 rounded-md hover:bg-[#c0c1c3] transition-colors duration-300 cursor-pointer"
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
