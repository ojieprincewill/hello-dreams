import { React, useState } from "react";
import supabase from "../../supabase/client";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import ProfileOptimizationSuccess from "./profile-optimization-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import PaystackPop from "@paystack/inline-js";

const pricingPlan = {
  service1: {
    // CV Writing alone
    student: 30,
    entry: 30,
    internship: 30,
    mid: 65,
    careerChange: 65,
    executive: 75,
  },
  service2: {
    // CV + LinkedIn bundle
    student: 55,
    entry: 55,
    internship: 55,
    mid: 125,
    careerChange: 125,
    executive: 140,
  },
  service3: {
    // LinkedIn only (individuals)
    student: 30,
    entry: 30,
    internship: 30,
    mid: 65,
    careerChange: 65,
    executive: 75,
  },
  service4: {
    // LinkedIn for business
    flat: 100,
  },
};

const careerLevelMap = {
  service1: "student",
  service2: "entry",
  service3: "internship",
  service4: "mid",
  service5: "careerChange",
  service6: "executive",
};

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
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      let calculatedPrice = "";

      if (updated.selectService) {
        if (updated.selectService === "service4") {
          // Business flat rate
          calculatedPrice = pricingPlan.service4.flat;
        } else if (updated.selectCareerLevel) {
          const careerKey = careerLevelMap[updated.selectCareerLevel];
          calculatedPrice = pricingPlan[updated.selectService][careerKey] || "";
        }
      }

      updated.price = calculatedPrice;
      return updated;
    });
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

    const paymentData = {
      price,
      email,
    };

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
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: paymentData,
        }
      );
      console.log(paymentData);
      console.log(data);
      console.log(initError);

      if (initError || !data?.access_code || !data?.reference) {
        setError("Payment initiation failed.");
        setLoading(false);
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f", // Optional: You can omit if set in backend
        reference: data.reference,
        email: email,
        amount: price * 100,
        onSuccess: async (response) => {
          // STEP 2: On success, verify the payment and update the order status
          const { data: verifyData, error: verifyError } =
            await supabase.functions.invoke("collections-checkout-handler", {
              body: {
                reference: response.reference,
                ...formData,
              },
            });
        },
        onCancel: () => {
          setError("Payment was cancelled.");
          setLoading(false);
        },
      });

      console.log(data);

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
    <div className="bg-[#f8f8f8] xl:bg-[#fff] w-full px-[5%] xl:px-[10%] py-15 md:py-25">
      {loading && <LoadingSpinner />}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[20px] md:text-[32px] text-center xl:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Optimise my Profile
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center xl:text-[18px] mb-10 xl:mb-20 xl:w-[793px] mx-auto leading-[1.5]"
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
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:gap-x-20  space-y-8 text-[#000000] md:p-6 "
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
            className="w-full text-[#333] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
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
            Select Career Level <span class="text-red-500">*</span>
          </label>
          <select
            name="selectCareerLevel"
            value={formData.selectCareerLevel}
            onChange={handleChange}
            disabled={formData.selectService === "service4"} // disable for business flat rate
            className={`w-full text-[#000] text-[14px] font-medium p-3 border rounded-sm focus:outline-none
    ${
      formData.selectService === "service4"
        ? "bg-gray-100 cursor-not-allowed text-gray-400 border-gray-300"
        : "bg-transparent border-[#c9c9c9]"
    }`}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="service1">Student</option>
            <option value="service2">Entry-Level</option>
            <option value="service3">Internship resume</option>
            <option value="service4">Mid - Senior level</option>
            <option value="service5">Career change</option>
            <option value="service6">Executive Level</option>
          </select>
          {formData.selectService === "service4" && (
            <p className="text-sm text-gray-500 mt-2">
              Career level not required for Business service
            </p>
          )}
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={formData.price ? `$${formData.price.toLocaleString()}` : ""}
            readOnly
            className="w-full text-[#333] bg-[#f8f8f8] p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
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
