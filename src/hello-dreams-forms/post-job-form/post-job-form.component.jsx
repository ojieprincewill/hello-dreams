import React, { useState } from "react";
import supabase from "../../supabase/client";
import PaystackPop from "@paystack/inline-js";
import PostJobSuccess from "./post-job-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { toast } from "@/components/admin-dashboard/ui/sonner";
import {
  isEmail,
  required,
  minLength,
  maxLength,
  validateForm as runValidation,
} from "@/utils/validation";

const PostJobForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

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
    setErrors({});

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

    // Schema-based validation
    const schema = {
      jobTitle: [
        { rule: required, message: "Job title is required" },
        { rule: minLength(3), message: "Job title must be at least 3 characters" },
        { rule: maxLength(120), message: "Job title must be 120 characters or less" },
      ],
      experienceLevel: [
        { rule: required, message: "Experience level is required" },
      ],
      workHours: [
        { rule: required, message: "Work hours are required" },
      ],
      payType: [
        { rule: required, message: "Pay type is required" },
      ],
      jobDescription: [
        { rule: required, message: "Job description is required" },
        { rule: minLength(20), message: "Description should be at least 20 characters" },
      ],
      applicationInstructions: [
        { rule: required, message: "Application instructions are required" },
        { rule: minLength(10), message: "Instructions should be at least 10 characters" },
      ],
      companyName: [
        { rule: required, message: "Company name is required" },
      ],
      companyEmail: [
        { rule: required, message: "Company email is required" },
        { rule: isEmail, message: "Enter a valid email address" },
      ],
    };

    const validation = runValidation(schema, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      // STEP 1: Call initiate-payment function
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: {
            email: companyEmail,
            amount: 50000, // Amount in Naira
          },
        }
      );
      // console.log(data);
      // console.log(initError);
      if (initError || !data?.access_code || !data?.reference) {
        toast.error("Payment initiation failed.");
        setError("Payment initiation failed.");
        setLoading(false);
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f", // Optional: You can omit if set in backend
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
            toast.error("Verification failed. Payment may not be confirmed.");
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
          toast.error("Payment was cancelled.");
          setError("Payment was cancelled.");
          setLoading(false);
        },
      });
    } catch (err) {
      console.error("Submission Error:", err);
      toast.error("An unexpected error occurred.");
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return success ? (
    <PostJobSuccess />
  ) : (
    <div className="bg-[#f8f8f8] xl:bg-[#fff] w-full px-[5%] xl:px-[10%] py-15 md:py-25">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center xl:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Post a Job
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center xl:text-[18px] mb-10 xl:mb-20 xl:w-[793px] mx-auto leading-[1.5]"
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
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            error={errors.jobTitle}
          />
          <InputField
            label="Experience Level"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
            error={errors.experienceLevel}
          />
          <InputField
            label="Work Hours"
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            required
            error={errors.workHours}
          />
          <InputField
            label="Pay Type"
            name="payType"
            value={formData.payType}
            onChange={handleChange}
            required
            error={errors.payType}
          />
        </div>

        <TextAreaField
          label="Job Description"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          required
          error={errors.jobDescription}
        />
        <TextAreaField
          label="Application Instructions"
          name="applicationInstructions"
          value={formData.applicationInstructions}
          onChange={handleChange}
          required
          hint="(e.g., Send your portfolio to email@example.com or apply via website.)"
          error={errors.applicationInstructions}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InputField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            error={errors.companyName}
          />
          <InputField
            label="Company Email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            required
            type="email"
            error={errors.companyEmail}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#010413] text-white font-semibold border border-[#010413] mt-7 text-[14px] px-6 py-3 rounded-lg hover:bg-[#1342ff] transition-colors duration-300"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </motion.form>
    </div>
  );
};

// Reusable Input Field
const InputField = ({ label, name, value, onChange, required, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-[#c9c9c9] bg-transparent rounded-sm focus:outline-none"
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// Reusable Text Area Field
const TextAreaField = ({ label, name, value, onChange, required, hint, error }) => (
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
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default PostJobForm;
