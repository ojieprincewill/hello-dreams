import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Preview2 from "../landing-previews/preview2.component";
import JoinCohort from "../landing-previews/join-cohort.component";

const ManageMembership = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("active");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full px-[5%] py-10 md:py-20">
      <div>
        {/* Tabs */}
        <div className="w-full overflow-x-auto whitespace-nowrap mb-10 scrollbar-hide">
          <div className="w-max flex flex-row items-center gap-2 md:gap-4 lg:gap-8 mx-auto border-b border-[#e5e7eb]">
            <button
              className={`pb-3 px-2 text-[14px] md:text-[16px] lg:text-[18px] font-semibold transition-colors duration-200 cursor-pointer ${
                activeTab === "membership"
                  ? "text-[#101828] border-b-4 border-[#efece9]"
                  : "text-[#667085] border-b-4 border-transparent hover:text-[#1342ff]"
              }`}
              onClick={() => setActiveTab("membership")}
            >
              Become a member of Hello Dreams Academy
            </button>
            <button
              className={`pb-3 px-2 text-[14px] md:text-[16px] lg:text-[18px] font-semibold transition-colors duration-200 cursor-pointer ${
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            {/* Billing Cycle Selection */}
            <div>
              <h2 className="text-[#000000] text-[16px] lg:text-[18px] font-semibold mb-6">
                Billing Cycle
              </h2>
              <p className="text-[#000000] text-[14px] md:text-[16px] lg:text-[18px] mb-8 ">
                Save 30% with an annual billing cycle
              </p>
              <div className="flex flex-wrap gap-10 md:gap-20 lg:gap-40 items-center my-10">
                <div className="space-y-6">
                  <p className="text-[#000000] text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
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
                    <span className="text-[#667085] text-[14px] md:text-[16px] lg:text-[18px]">
                      Pay :{" "}
                      <span className="font-semibold text-[#000000]">
                        ₦12,000
                      </span>
                    </span>
                  </label>
                </div>
                <div className="space-y-6">
                  <p className="text-[#000000] text-[14px] md:text-[16px] lg:text-[18px] font-semibold">
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
                    <span className="text-[#667085] text-[14px] md:text-[16px] lg:text-[18px]">
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
                    <h3 className="text-[#000000] text-[16px] lg:text-[18px] font-semibold mb-4">
                      Invoice details
                    </h3>
                    <form
                      className="space-y-5"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
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
                          )
                        }
                      >
                        {billingCycle === "monthly"
                          ? "Pay 12,000/monthly"
                          : "Pay 100,800/annually"}
                      </button>
                    </form>
                  </div>
                )}
                {formStep === 2 && (
                  <div className="text-center text-[#667085]">
                    [Payment step placeholder]
                  </div>
                )}
                {formStep === 3 && (
                  <div className="text-center text-[#667085]">
                    [Confirmation step placeholder]
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <h2
              className="text-[#010413] text-[20px] md:text-[30px] lg:text-[40px] font-bold my-6 text-center"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Choose a course to buy
            </h2>
            {/* Course Cards Grid Placeholder */}
            <Preview2 />
            {/* Cohort Section Placeholder */}
            <JoinCohort />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembership;
