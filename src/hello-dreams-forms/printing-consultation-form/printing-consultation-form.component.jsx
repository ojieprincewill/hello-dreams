import { React, useState, useEffect } from "react";
import supabase from "../../supabase/client";
import LoadingSpinner from "../../components/loading-spinner/loading-spinner.component";
import PrintingConsultationSuccess from "./printing-consultation-success.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import { convertAndFormatUsdToNgn, convertUsdToNgn } from "../../utils/currency";
import { isEmail, isPhone, required, minLength, validateForm as runValidation } from "@/utils/validation";

const PrintingConsultationForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const price = searchParams.get("price");
  // console.log(price);
  const title = searchParams.get("title");

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
  const [priceInNgn, setPriceInNgn] = useState(null);
  const [payLabel, setPayLabel] = useState("");

  // Compute NGN amounts and display label when price changes
  useEffect(() => {
    let isCancelled = false;
    async function computePrice() {
      if (!price) {
        setPriceInNgn(null);
        setPayLabel("");
        return;
      }
      try {
        const cleanPrice = String(price).replace("$", "");
        const [ngn, label] = await Promise.all([
          convertUsdToNgn(cleanPrice),
          convertAndFormatUsdToNgn(cleanPrice),
        ]);
        if (!isCancelled) {
          setPriceInNgn(ngn);
          setPayLabel(label);
        }
      } catch (e) {
        if (!isCancelled) {
          setPriceInNgn(null);
          setPayLabel("");
        }
      }
    }
    computePrice();
    return () => {
      isCancelled = true;
    };
  }, [price]);

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
      company,
      message,
      service,
      accompanyingServices,
      howDidYouHear,
    } = formData;
    const schema = {
      name: [
        { rule: required, message: "Name is required" },
        { rule: minLength(2), message: "Name must be at least 2 characters" },
      ],
      email: [
        { rule: required, message: "Email is required" },
        { rule: isEmail, message: "Enter a valid email address" },
      ],
      phone: [
        { rule: required, message: "Phone number is required" },
        { rule: isPhone, message: "Enter a valid phone number" },
      ],
      service: [
        { rule: required, message: "Service selection is required" },
      ],
    };
    const validation = runValidation(schema, formData);
    if (!validation.isValid) {
      setError("Please fill in all required fields correctly.");
      setLoading(false);
      return;
    }

    const payload = {
      type: "Printing Consultation",
      name,
      email,
      phone,
      data: { company, message, service, accompanyingServices, howDidYouHear },
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-service-enquiries",
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
    }
  };

  const handlePay = async (event) => {
    event.preventDefault();
    
    // Prevent multiple simultaneous calls
    if (loading) {
      return;
    }
    
    setLoading(true);
    setSuccess(null);
    setError(null);

    const {
      name,
      email,
      phone,
      company,
      message,
      service,
      accompanyingServices,
      howDidYouHear,
    } = formData;
    const schema = {
      name: [
        { rule: required, message: "Name is required" },
        { rule: minLength(2), message: "Name must be at least 2 characters" },
      ],
      email: [
        { rule: required, message: "Email is required" },
        { rule: isEmail, message: "Enter a valid email address" },
      ],
      phone: [
        { rule: required, message: "Phone number is required" },
        { rule: isPhone, message: "Enter a valid phone number" },
      ],
      service: [
        { rule: required, message: "Service selection is required" },
      ],
    };
    const validation = runValidation(schema, formData);
    if (!validation.isValid) {
      setError("Please fill in all required fields correctly.");
      setLoading(false);
      return;
    }

    const payload = {
      type: "Printing Order",
      name,
      email,
      phone,
      data: { company, message, service, accompanyingServices, howDidYouHear, title },
    };

    // Remove dollar sign before passing to backend
    const cleanPrice = String(price).replace('$', '');
    const PriceInNgn = await convertUsdToNgn(cleanPrice);
    console.log(PriceInNgn);
    
    const paymentData = {
      amount: PriceInNgn,
      email,
      currency: "NGN",
    };

    console.log(paymentData);

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

      const orderData = {
        name: formData.name,
        totalItems: 1,
        orderStatus: "pending",
        orderTotal: PriceInNgn,
        orderItems: title,
        orderEmail: email,
        orderPhone: formData.phone,
        orderAddress: formData.address,
        orderCity: formData.city,
        orderState: formData.state,
        orderCountry: formData.country || "Nigeria",
        orderPaymentReference: data.reference,
      };

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f",
        reference: data.reference,
        email: email,
        amount: Math.round(Number(PriceInNgn) * 100), // Convert to kobo/cents
        currency: "NGN", // Match backend currency
        onSuccess: (response) => {
          // Handle success immediately without async operations
          console.log("Payment successful:", response);
          
          // Set success state immediately
          setSuccess("Payment Successful!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
            service: "",
            accompanyingServices: "",
            howDidYouHear: "",
          });
          setLoading(false);
          
          // Optionally verify payment in background (don't await)
          verifyPaymentInBackground(response.reference, orderData);
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

  // Separate function to handle verification in background
  const verifyPaymentInBackground = async (reference, orderData) => {
    try {
      const { data: verifyData, error: verifyError } =
        await supabase.functions.invoke("collections-checkout-handler", {
          body: {
            reference: reference,
            ...orderData,
          },
        });

      if (verifyError || verifyData?.error) {
        console.error("Verification failed:", verifyError);
        // You could show a warning here, but don't change the success state
      } else {
        console.log("Payment verified successfully");
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  return success ? (
    <PrintingConsultationSuccess />
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
        {title ? `Order ${title}` : "Get a free consultation"}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center xl:text-[18px] mb-10 xl:mb-20 xl:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {title ? `Please fill out the form below to order ${title}.` : "Please fill out the form below"}
      </motion.p>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        onSubmit={price ? handlePay : handleSubmit}
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
              <option value="" disabled>
                Select an option
              </option>
              <option value="service1">UI/UX Design</option>
              <option value="service2">Logo Design</option>
              <option value="service3">Branding</option>
              <option value="service4">User Research</option>
              <option value="service5">Redesign</option>
              <option value="service6">Development</option>
              <option value="service7">Printing</option>
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
              <option value="" disabled>
                Select an option
              </option>
              <option value="service1">Business Cards</option>
              <option value="service2">Flyers and Brochures</option>
              <option value="service3">Posters and Banners</option>
              <option value="service4">Company Souvenirs</option>
              <option value="service5">Custom Prints</option>
              <option value="service6">Brochures</option>
              <option value="service7">Menus</option>
              <option value="service8">Labels and Stickers</option>
              <option value="service9">Notepads and Stationery</option>
              <option value="service10">Others</option>
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
            <option value="" disabled>
              Select an option
            </option>
            <option value="google">Google search</option>
            <option value="referral">From a friend</option>
            <option value="social">LinkedIn</option>
            <option value="social">Instagram</option>
            <option value="social">Youtube</option>
          </select>
        </div>
        <div>
          {price ? (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : (payLabel ? `Pay ${payLabel}` : `Pay ${price}`)}
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}

          {error && <p className="text-red-600 mt-4">{error}</p>}
          {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
      </motion.form>
    </div>
  );
};

export default PrintingConsultationForm;
