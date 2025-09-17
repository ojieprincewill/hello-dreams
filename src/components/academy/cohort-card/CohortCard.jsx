import React, { useState, useMemo } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import supabase from "@/supabase/client";
import PaystackPop from "@paystack/inline-js";
import { useClosestCohort } from "@/hooks/useCohorts";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const CohortCard = ({ info, price, oldPrice, currency, children }) => {
  const [activeTab, setActiveTab] = useState("course-fee");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { data: closestCohort } = useClosestCohort();

  const dynamicTabs = useMemo(() => {
    if (!closestCohort) return null;
    return [
      { id: "course-details", label: "Course details", details: closestCohort.course_details || "Course details" },
      { id: "requirements", label: "Requirements", details: closestCohort.requirements || "Requirements" },
      { id: "curriculum", label: "Curriculum", details: closestCohort.curriculum || "Curriculum" },
      { id: "course-fee", label: "Course fee", details: "Course fee" },
    ];
  }, [closestCohort]);

  const handlePayNow = async () => {
    if (!isAuthenticated || !user?.email) {
      navigate("/login");
      return;
    }

    if (!price && !closestCohort?.price) return;

    setPaymentLoading(true);
    try {
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: {
            email: user.email,
            amount: closestCohort?.price ?? price,
          },
        }
      );

      if (initError || !data?.access_code || !data?.reference) {
        setPaymentLoading(false);
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f",
        reference: data.reference,
        email: user.email,
        amount: (closestCohort?.price ?? price) * 100,
        onSuccess: async () => {
          setPaymentLoading(false);
        },
        onCancel: () => {
          setPaymentLoading(false);
        },
      });
    } catch (err) {
      setPaymentLoading(false);
    }
  };

  const tabs = [
    { id: "course-details", label: "Course details", details: "Course details" },
    { id: "requirements", label: "Requirements", details: "Requirements" },
    { id: "curriculum", label: "Curriculum", details: "Curriculum" },
    { id: "course-fee", label: "Course fee", details: "Course fee" },
  ];

  return (
    <div className="w-full bg-[#eef2fe] rounded-2xl overflow-hidden px-[5%] py-5 mb-5">
      <p className="text-[#000000] text-[20px] md:text-[24px] xl:text-[40px] text-center font-bold my-3">
        Join our next cohort
      </p>
      {closestCohort?.start_date && (
        <p className="text-[#666666] text-[14px] md:text-[16px] xl:text-[18px] text-center font-medium mb-3">
          Starting {new Date(closestCohort.start_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      )}
      <div className="grid grid-cols-2 xl:grid-cols-4 my-10 gap-y-10">
        {info.map((data, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            custom={index}
            key={data.id}
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-[#fff] w-[74.85px] h-[64.16px] md:w-[147px] md:h-[126px] rounded-xl overflow-hidden">
              <img
                src={data.image}
                alt={data.text}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[#000000] text-[12px] md:text-[16px] xl:text-[20px] font-bold mt-2 ">
              {data.text}
            </p>
          </motion.div>
        ))}
      </div>
      {/* Tabs or children */}
      {children ? (
        <div className="mt-2">{children}</div>
      ) : (
        <div
          className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap md:justify-center bg-[#010413] w-full h-[38px] md:h-[58px] xl:h-[98px] items-center rounded-xl overflow-hidden my-5 "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {(dynamicTabs || tabs).map((tab) => (
            <span
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-2 md:px-5 py-2 text-[10px] md:text-[14px] xl:text-[18px] font-medium rounded-md transition-colors duration-300
        ${
          activeTab === tab.id
            ? "bg-[#ff7f50] text-white"
            : "text-[#f7f7f7] hover:bg-[#ff7f50]"
        }`}
            >
              {tab.label}
            </span>
          ))}
        </div>
      )}

      {activeTab === "course-fee" && (
        <div
          className="bg-[#fff] w-[70%] md:w-[60%] p-5 mx-auto flex flex-col justify-center items-center space-y-5 rounded-2xl overflow-hidden "
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-[#010413] text-[8px] md:text-[14px] xl:text-[18px] font-medium ">
              Course fee
            </span>
            <p className="border border-[#eaecf0] text-[#000000] text-[6px] md:text-[8px] rounded-sm h-[16px] md:h-[26px] px-1 md:px-2 flex justify-center items-center ">
              {currency}{" "}
              <ChevronDownIcon className="inline w-2 h-2 md:w-3 md:h-3 ml-1 " />
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[#010413] text-[9px] md:text-[16px] xl:text-[20px] font-bold ">
              {currency} {(closestCohort?.price ?? price).toLocaleString()}
            </span>
            <span className="text-[#ed405c] text-[9px] md:text-[16px] xl:text-[20px] font-bold line-through">
              {currency} {(closestCohort?.old_price ?? oldPrice).toLocaleString()}
            </span>
          </div>
          <button className="bg-[#1342ff] w-[100px] md:w-[176px] text-[#fff] text-[9px] md:text-[16px] xl:text-[20px] font-bold rounded-md px-6 py-2 overflow-hidden hover:bg-[#1b13ff] cursor-pointer transition-colors duration-300" onClick={handlePayNow} disabled={paymentLoading}>
            {paymentLoading ? "Processing..." : "Pay now"}
          </button>
        </div>
      )}

      {activeTab !== "course-fee" && (
        <div className="w-full text-center mt-5 text-[#010413] text-[14px] md:text-[16px] xl:text-[18px]">
          {(dynamicTabs || tabs).find((tab) => tab.id === activeTab)?.details}
        </div>
      )}
    </div>
  );
};

export default CohortCard;
