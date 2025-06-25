import React, { useState } from "react";
import supabase from "../../supabase/client";
import PaystackPop from "@paystack/inline-js";
import PostJobSuccess from "./post-job-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const PostJobForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    jobTitle: "",
    experienceLevel: "",
    workHours: "",
    payType: "",
    jobDescription: "",
    applicationInstructions: "",
    companyName: "",
    companyEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    const {
      jobTitle,
      experienceLevel,
      workHours,
      payType,
      jobDescription,
      applicationInstructions,
      companyName,
      companyEmail,
    } = formData;

    if (
      !jobTitle ||
      !jobDescription ||
      !experienceLevel ||
      !workHours ||
      !payType ||
      !applicationInstructions ||
      !companyEmail ||
      !companyName
    ) {
      setError("Missing required fields");
    }

    try {
      // STEP 1: Call initiate-payment function
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: {
            companyEmail,
            amount: 50000, // Amount in Naira
          },
        }
      );
      console.log(data);
      console.log(initError);
      if (initError || !data?.access_code || !data?.reference) {
        setError("Payment initiation failed.");
        setLoading(false);
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_test_414916414abee3089f4da16c7f1b38b9992bac0c", // Optional: You can omit if set in backend
        reference: data.reference,
        email: companyEmail,
        amount: 50000 * 100,
        onSuccess: async (response) => {
          // STEP 2: On success, verify the payment and post job
          const { data: verifyData, error: verifyError } =
            await supabase.functions.invoke("handle-job-posting", {
              body: {
                reference: response.reference,
                ...formData,
              },
            });

          if (verifyError || verifyData?.error) {
            setError("Verification failed. Payment may not be confirmed.");
          } else {
            setSuccess("Job posted successfully!");
            setFormData({
              jobTitle: "",
              experienceLevel: "",
              workHours: "",
              payType: "",
              jobDescription: "",
              applicationInstructions: "",
              companyName: "",
              companyEmail: "",
            });
          }
          setLoading(false);
        },
        onCancel: () => {
          setError("Payment was cancelled.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("Submission Error:", err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return success ? (
    <PostJobSuccess />
  ) : (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Post a Job
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Post your job in front of top-tier creative talent. A one-time fee of{" "}
        <span className="font-bold">₦50,000</span> is required to submit your
        listing. Once your job is submitted and payment is confirmed, it will be
        reviewed and published on our platform within{" "}
        <span className="font-bold">24 hours</span>.
      </motion.p>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="w-full space-y-8 text-[#000000] md:p-6 "
      >
        <div className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8">
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Job Title <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g., Graphic designer"
              className="w-full placeholder:text-[#667085] placeholder:text-[14px] p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Experience Level <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Work Hours <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Pay Type <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-8 text-[#000000] md:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            <InputField
              label="Experience Level"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              required
            />
            <InputField
              label="Work Hours"
              name="workHours"
              value={formData.workHours}
              onChange={handleChange}
              required
            />
            <InputField
              label="Pay Type"
              name="payType"
              value={formData.payType}
              onChange={handleChange}
              required
            />
          </div>

          <TextAreaField
            label="Job Description"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          />
          <TextAreaField
            label="Application Instructions"
            name="applicationInstructions"
            value={formData.applicationInstructions}
            onChange={handleChange}
            required
            hint="(e.g., Send your portfolio to email@example.com or apply via website.)"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <InputField
              label="Company Email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#010413] text-white font-semibold border border-[#010413] mt-7 text-[14px] px-6 py-3 rounded-lg hover:bg-[#1342ff] transition-colors duration-300"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
        <div className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20  space-y-8">
          <div>
            <label
              className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
              aria-required
            >
              Company Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              name=""
              value=""
              onChange={handleChange}
            />
          </div>
          <div className="space-y-5 md:space-y-10">
            <div>
              <label
                className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
                aria-required
              >
                Company Email <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
                name=""
                value=""
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
              >
                Post job
              </button>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label, name, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-[#c9c9c9] bg-transparent rounded-sm focus:outline-none"
    />
  </div>
);

// Reusable Text Area Field
const TextAreaField = ({ label, name, value, onChange, required, hint }) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] rounded-sm focus:outline-none"
    />
    {hint && <span className="text-xs text-gray-500 mt-1 block">{hint}</span>}
  </div>
);

export default PostJobForm;
