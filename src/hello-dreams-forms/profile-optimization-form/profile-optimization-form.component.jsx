import { React, useState } from "react";
import supabase from "../../supabase/client";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ProfileOptimizationSuccess from "./profile-optimization-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const ProfileOptimizationForm = () => {
  const [formData, setFormData] = useState({
    type: "Profile Optimization",
    name: "",
    email: "",
    phone: "",
    currentJob: "",
    selectService: "",
    selectCareerLevel: "",
    price: "",
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

    const {
      name,
      email,
      phone,
      selectService,
      currentJob,
      selectCareerLevel,
      price,
    } = formData;
    if (!name || !email || !phone || !selectService) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const { type, ...rest } = formData;

    const payload = {
      type: "Profile Optimization",
      name,
      email,
      phone,
      data: {
        currentJob,
        selectService,
        selectCareerLevel,
        price,
      },
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-service-enquiries",
        {
          body: payload,
        }
      );

      console.log(data);

      if (error) {
        const supabaseError = error.message || error;
        console.error("Supabase Error:", supabaseError);
        setError("Submission failed. Please try again.");
        return;
      }

      setSuccess("Your enquiry has been submitted!");

      setFormData({
        type: "Profile Optimization",
        name: "",
        email: "",
        phone: "",
        currentJob: "",
        selectService: "",
        selectCareerLevel: "",
        price: "",
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return success ? (
    <ProfileOptimizationSuccess />
  ) : (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      {loading && <LoadingSpinner />}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Optimise my Profile
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Please complete the form below and make the payment, we will contact you
        to begin the optimization process. Please note that it takes 1 to 5 days
        to complete. After payment confirmation, we will promptly reach out to
        you to start the work
      </motion.p>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
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
            Current Job (Optional)
          </label>
          <input
            type="text"
            name="currentJob"
            value={formData.currentJob}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Select Service <span class="text-red-500">*</span>
          </label>
          <select
            name="selectService"
            value={formData.selectService}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">CV Writing alone</option>
            <option value="service2">CV Writing & LinkedIn Optimisation</option>
            <option value="service3">
              LinkedIn Optimisation for individuals{" "}
            </option>
            <option value="service4">LinkedIn Optimisation for Business</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Select Career Level
          </label>
          <select
            name="selectCareerLevel"
            value={formData.selectCareerLevel}
            onChange={handleChange}
            className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="">
              Select an option
            </option>
            <option value="service1">Student </option>
            <option value="service2">Entry-Level </option>
            <option value="service3">Internship resume</option>
            <option value="service4">Mid - Senior level </option>
            <option value="service5">Career change</option>
            <option value="service6">Executive Level</option>
          </select>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            {loading ? "Submitting..." : "Proceed"}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
      </motion.form>
    </div>
  );
};

export default ProfileOptimizationForm;
