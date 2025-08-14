import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Preview2 from "../landing-previews/preview2.component";
import JoinCohort from "../landing-previews/join-cohort.component";
import { useCourse } from '@/hooks/useCourses';
import { useAuth } from '@/hooks/useAuth';
import supabase from '@/supabase/client';
import PaystackPop from "@paystack/inline-js";

const ManageMembership = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = searchParams.get("active");
  const courseIdParam = searchParams.get("courseId");
  const initialTab =
    tabParam === "course" || tabParam === "membership"
      ? tabParam
      : "membership";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  });

  // Payment states
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Add new state for membership payment
  const [membershipPaymentLoading, setMembershipPaymentLoading] = useState(false);
  const [membershipPaymentError, setMembershipPaymentError] = useState(null);
  const [membershipPaymentSuccess, setMembershipPaymentSuccess] = useState(false);

  // Fetch the selected course if courseId is present
  const { data: selectedCourse, isLoading: courseLoading } = useCourse(courseIdParam);
  const { user, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = async () => {
    if (!selectedCourse) return;
    
    // Check if user is authenticated
    if (!isAuthenticated || !user?.email) {
      setPaymentError("Please log in to purchase this course.");
      return;
    }
    
    setPaymentLoading(true);
    setPaymentError(null);
    setPaymentSuccess(false);

    try {
      // STEP 1: Call initiate-payment function
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: {
            email: user.email,
            amount: selectedCourse.price || 50000, // Amount in Naira
          },
        }
      );

      if (initError || !data?.access_code || !data?.reference) {
        setPaymentError("Payment initiation failed.");
        setPaymentLoading(false);
        return;
      }
      setFormStep(2);
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f",
        reference: data.reference,
        email: user.email,
        amount: (selectedCourse.price || 50000) * 100,
        onSuccess: async (response) => {
          // STEP 2: On success, verify the payment and enroll student
          const { data: verifyData, error: verifyError } =
            await supabase.functions.invoke("enroll-student", {
              body: {
                reference: response.reference,
                courseId: selectedCourse.id,
                courseTitle: selectedCourse.title,
                amount: selectedCourse.price || 50000,
                userId: user.id,
                userEmail: user.email,
              },
            });

          if (verifyError || verifyData?.error) {
            setPaymentError("Verification failed. Payment may not be confirmed.");
          } else {
            setPaymentSuccess(true);
            setFormStep(3);
            // Redirect to the course player after successful payment
            setTimeout(() => {
              navigate(`/academy/courses/${selectedCourse.id}/player`);
            }, 2000);
          }
          setPaymentLoading(false);
        },
        onCancel: () => {
          setPaymentError("Payment was cancelled.");
          setPaymentLoading(false);
        },
      });
    } catch (err) {
      console.error("Payment Error:", err);
      setPaymentError("An unexpected error occurred.");
      setPaymentLoading(false);
    }
  };

  // Membership payment handler
  const handleMembershipPayment = async (e) => {
    e.preventDefault();
    setMembershipPaymentLoading(true);
    setMembershipPaymentError(null);
    setMembershipPaymentSuccess(false);

    // Validate form
    if (!formData.email || !formData.name || !formData.country || !formData.city || !formData.state || !formData.zip) {
      setMembershipPaymentError("Please fill all required fields.");
      setMembershipPaymentLoading(false);
      return;
    }

    // Determine amount
    const amount = billingCycle === "monthly" ? 12000 : 100800;
    const membershipType = billingCycle === "monthly" ? "monthly" : "annually";

    try {
      // STEP 1: Initiate Paystack payment
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: {
            email: formData.email,
            amount: amount, // Naira
          },
        }
      );
      if (initError || !data?.access_code || !data?.reference) {
        setMembershipPaymentError("Payment initiation failed.");
        setMembershipPaymentLoading(false);
        return;
      }
      setFormStep(2);
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f",
        reference: data.reference,
        email: formData.email,
        amount: amount * 100,
        onSuccess: async (response) => {
          
          // STEP 2: Call handle-membership edge function
          const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
            "handle-membership",
            {
              body: {
                reference: response.reference,
                membership_type: membershipType,
                amount,
                user_email: formData.email,
                user_name: formData.name,
                billing_address: {
                  country: formData.country,
                  city: formData.city,
                  state: formData.state,
                  zip: formData.zip,
                },
              },
            }
          );
          if (verifyError || verifyData?.error) {
            setMembershipPaymentError("Verification failed. Payment may not be confirmed.");
          } else {
            setMembershipPaymentSuccess(true);
            setFormStep(3);
          }
          setMembershipPaymentLoading(false);
        },
        onCancel: () => {
          setMembershipPaymentError("Payment was cancelled.");
          setMembershipPaymentLoading(false);
        },
      });
    } catch (err) {
      setMembershipPaymentError("An unexpected error occurred.");
      setMembershipPaymentLoading(false);
    }
  };

  return (
    <div className="w-full px-[5%] py-10 md:py-20">
      <div>
        {/* Tabs */}
        <div className="w-full overflow-x-auto whitespace-nowrap mb-10 scrollbar-hide">
          <div className="w-max flex flex-row items-center gap-2 md:gap-4 xl:gap-8 mx-auto border-b border-[#e5e7eb]">
            <button
              className={`pb-3 px-2 text-[14px] md:text-[16px] xl:text-[18px] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === "membership"
                  ? "text-[#101828] border-b-4 border-[#efece9]"
                  : "text-[#667085] border-b-4 border-transparent hover:text-[#1342ff]"
              }`}
              onClick={() => setActiveTab("membership")}
            >
              Become a member of Hello Dreams Academy
            </button>
            <button
              className={`pb-3 px-2 text-[14px] md:text-[16px] xl:text-[18px] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === "course"
                  ? "text-[#101828] border-b-4 border-[#efece9]"
                  : "text-[#667085] border-b-4 border-transparent hover:text-[#1342ff]"
              }`}
              onClick={() => setActiveTab("course")}
            >
              Buy one time course
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "membership" ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-10">
            {/* Billing Cycle Selection */}
            <div>
              <h2 className="text-[#000000] text-[16px] xl:text-[18px] font-semibold mb-6">
                Billing Cycle
              </h2>
              <p className="text-[#000000] text-[14px] md:text-[16px] xl:text-[18px] mb-8 ">
                Save 30% with an annual billing cycle
              </p>
              <div className="flex flex-wrap gap-10 md:gap-20 xl:gap-40 items-center my-10">
                <div className="space-y-6">
                  <p className="text-[#000000] text-[14px] md:text-[16px] xl:text-[18px] font-semibold">
                    Monthly
                  </p>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="billingCycle"
                      value="monthly"
                      checked={billingCycle === "monthly"}
                      onChange={() => setBillingCycle("monthly")}
                      className="mr-2 appearance-none w-[20px] h-[17px] border border-[#eaecf0] rounded-sm checked:bg-[#1342ff] focus:outline-none focus:ring-1 focus:ring-[#1342ff] transition-colors duration-200 cursor-pointer"
                    />
                    <span className="text-[#667085] text-[14px] md:text-[16px] xl:text-[18px]">
                      Pay :{" "}
                      <span className="font-semibold text-[#000000]">
                        ₦12,000
                      </span>
                    </span>
                  </label>
                </div>
                <div className="space-y-6">
                  <p className="text-[#000000] text-[14px] md:text-[16px] xl:text-[18px] font-semibold">
                    Annually
                  </p>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="billingCycle"
                      value="annually"
                      checked={billingCycle === "annually"}
                      onChange={() => setBillingCycle("annually")}
                      className="mr-2 appearance-none w-[20px] h-[17px] border border-[#eaecf0] rounded-sm checked:bg-[#1342ff] focus:outline-none focus:ring-1 focus:ring-[#1342ff] transition-colors duration-200 cursor-pointer"
                    />
                    <span className="text-[#667085] text-[14px] md:text-[16px] xl:text-[18px]">
                      Pay :{" "}
                      <span className="font-semibold text-[#000000]">
                        ₦100,800
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Multi-step Form Placeholder */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <div className="flex gap-4 w-max">
                    <p
                      className={`flex items-center font-semibold text-[14px] md:text-[16px] ${
                        formStep === 1 ? "text-[#1342ff]" : "text-[#667085]"
                      }`}
                    >
                      <span
                        className={`mr-1 w-[22px] h-[22px] text-[10px] md:text-[12px] rounded-full flex justify-center items-center ${
                          formStep === 1
                            ? "bg-[#1342ff] text-[#fff]"
                            : "bg-[#efece9] text-[#000000]"
                        }`}
                      >
                        1
                      </span>{" "}
                      Invoice
                    </p>
                    <p
                      className={`flex items-center font-semibold text-[14px] md:text-[16px] ${
                        formStep === 2 ? "text-[#1342ff]" : "text-[#667085]"
                      }`}
                    >
                      <span
                        className={`mr-1 w-[22px] h-[22px] bg-[#efece9] text-[#000000] text-[12px] rounded-full flex justify-center items-center ${
                          formStep === 2
                            ? "bg-[#1342ff] text-[#fff]"
                            : "bg-[#efece9] text-[#000000]"
                        }`}
                      >
                        2
                      </span>{" "}
                      Payment
                    </p>
                    <p
                      className={`flex items-center font-semibold text-[14px] md:text-[16px] ${
                        formStep === 3 ? "text-[#1342ff]" : "text-[#667085]"
                      }`}
                    >
                      <span
                        className={`mr-1 w-[22px] h-[22px] bg-[#efece9] text-[#000000] text-[12px] rounded-full flex justify-center items-center ${
                          formStep === 3
                            ? "bg-[#1342ff] text-[#fff]"
                            : "bg-[#efece9] text-[#000000]"
                        }`}
                      >
                        3
                      </span>{" "}
                      Confirmation
                    </p>
                  </div>
                </div>

                {/* Stepper controls for demo */}
                {/* <div className="flex gap-2">
                  <button
                    onClick={() => setFormStep(Math.max(1, formStep - 1))}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setFormStep(Math.min(3, formStep + 1))}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    Next
                  </button>
                </div> */}
              </div>

              {/* Step content placeholder */}
              <div className="bg-white rounded-xl shadow p-3 md:p-6 min-h-[300px] flex flex-col justify-between">
                {formStep === 1 && (
                  <div>
                    <h3 className="text-[#000000] text-[16px] xl:text-[18px] font-semibold mb-4">
                      Invoice details
                    </h3>
                    <form
                      className="space-y-5"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                      onSubmit={handleMembershipPayment}
                    >
                      <div>
                        <label className="block text-[#667085] text-[12px] mb-1">
                          Billing Email
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="w-full bg-[#f7f7f7] px-3 py-2 rounded-md border border-[#eaecf0] placeholder:text-[#667085] placeholder:text-[12px] md:placeholder:text-[14px] focus:outline-none"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <span className="text-[#667085] text-[12px] ">
                          We will send invoice to this email
                        </span>
                      </div>

                      <div>
                        <label className="block text-[#667085] text-[12px] mb-1">
                          Billing Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          className="w-full bg-[#f7f7f7] px-3 py-2 rounded-md border border-[#eaecf0] placeholder:text-[#667085] placeholder:text-[12px] md:placeholder:text-[14px] focus:outline-none"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[#667085] text-[12px] mb-1">
                          Billing Address
                        </label>
                        <input
                          name="country"
                          type="text"
                          className="w-full bg-[#f7f7f7] px-3 py-2 rounded-md border border-[#eaecf0] placeholder:text-[#667085] placeholder:text-[12px] md:placeholder:text-[14px] focus:outline-none"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="flex gap-2">
                        <input
                          name="city"
                          type="text"
                          className="w-full bg-[#f7f7f7] px-3 py-2 rounded-md border border-[#eaecf0] placeholder:text-[#667085] placeholder:text-[12px] md:placeholder:text-[14px] focus:outline-none"
                          placeholder="City/Town"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                        <input
                          name="state"
                          type="text"
                          className="w-full bg-[#f7f7f7] px-3 py-2 rounded-md border border-[#eaecf0] placeholder:text-[#667085] placeholder:text-[12px] md:placeholder:text-[14px] focus:outline-none"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <input
                        name="zip"
                        type="text"
                        className="w-full bg-[#f7f7f7] px-3 py-2 rounded-md border border-[#eaecf0] placeholder:text-[#667085] placeholder:text-[12px] md:placeholder:text-[14px] focus:outline-none"
                        placeholder="Zip code"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                      />

                      <button
                        className="w-full mt-8 bg-[#1342ff] text-white text-[16px] font-bold rounded-lg py-3 disabled:opacity-60 hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer"
                        disabled={
                          !(
                            formData.email &&
                            formData.name &&
                            formData.country &&
                            formData.city &&
                            formData.state &&
                            formData.zip
                          ) || membershipPaymentLoading
                        }
                        type="submit"
                      >
                        {membershipPaymentLoading
                          ? "Processing..."
                          : billingCycle === "monthly"
                          ? "Pay 12,000/monthly"
                          : "Pay 100,800/annually"}
                      </button>
                      {membershipPaymentError && (
                        <p className="text-red-500 text-sm mt-2">{membershipPaymentError}</p>
                      )}
                    </form>
                  </div>
                )}
                {formStep === 2 && (
                  <div className="text-center text-[#667085]">
                    [Payment step placeholder]
                  </div>
                )}
                {formStep === 3 && (
                  <div className="text-center text-[#1342ff]">
                    <h3 className="text-[18px] font-bold mb-2">Membership Activated!</h3>
                    <p className="text-[#667085]">Thank you for becoming a member. You now have full access to all courses and features.</p>
                    <button
                      className="mt-6 bg-[#1342ff] text-white text-[16px] font-bold rounded-lg py-3 px-6 hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer"
                      onClick={() => navigate("/academy")}
                    >
                      Go to Academy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <h2
              className="text-[#010413] text-[20px] md:text-[30px] xl:text-[40px] font-bold my-6 text-center"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Choose a course to buy
            </h2>
            {/* If a course is selected, show its card at the top */}
            {courseIdParam && !courseLoading && selectedCourse && (
              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-md">
                  <div className="w-full h-max p-4 border border-[#dfdfe2] rounded-2xl flex flex-col">
                    <div className="relative w-full h-[181.55px] md:h-[221.16px] overflow-hidden rounded-xl mb-4">
                      <img
                        src={selectedCourse.cover_image}
                        alt={selectedCourse.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-row justify-between text-[#010413] pb-2">
                      <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
                        {selectedCourse.title}
                      </p>
                    </div>
                    <p className="text-[16px] md:text-[23px] text-[#667085] font-bold pb-4 ">
                      {selectedCourse.instructor_name}
                    </p>
                    <p className="text-[14px] w-max md:text-[16px] text-[#787777] font-bold mb-2 pb-2 border-b-4 border-b-[#efece9] flex items-center ">
                      {selectedCourse.total_lessons} Lessons . {selectedCourse.total_duration}
                    </p>
                    <p className="text-[24px] md:text-[27.88px] text-[#010413] font-bold pt-2 ">
                      NGN {selectedCourse.price?.toLocaleString()}
                    </p>
                    {isAuthenticated ? (
                      <button
                        className="w-full mt-6 bg-[#1342ff] text-white text-[16px] font-bold rounded-lg py-3 disabled:opacity-60 hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer"
                        onClick={handleBuyNow}
                        disabled={paymentLoading}
                      >
                        {paymentLoading ? "Processing..." : "Buy Now"}
                      </button>
                    ) : (
                      <div className="mt-6 text-center">
                        <p className="text-[#667085] text-sm mb-3">Please log in to purchase this course</p>
                        <Link
                          to="/login"
                          className="w-full bg-[#1342ff] text-white text-[16px] font-bold rounded-lg py-3 hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer inline-block"
                        >
                          Login to Purchase
                        </Link>
                      </div>
                    )}
                    {paymentError && (
                      <p className="text-red-500 text-sm mt-2">{paymentError}</p>
                    )}
                    {paymentSuccess && (
                      <p className="text-green-500 text-sm mt-2">
                        Payment successful! Redirecting you to the course...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Course Cards Grid Placeholder */}
            <Preview2 user={user} isAuthenticated={isAuthenticated} />
            {/* Cohort Section Placeholder */}
            <JoinCohort />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembership;
