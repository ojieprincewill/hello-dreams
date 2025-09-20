import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import supabase from "../../supabase/client";
import { isEmail } from "../../utils/validation";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    if (!isEmail(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const { data, error } = await supabase.functions.invoke("subscribe", {
        body: { email: email.trim() }
      });

      if (error) {
        throw error;
      }

      setMessage("Successfully subscribed! Check your email for a welcome message.");
      setMessageType("success");
      setEmail(""); // Clear the form
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage("Failed to subscribe. Please try again later.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear message when user starts typing
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  return (
    <div className="bg-[#fff] p-5 md:p-10 xl:p-20">
      <span
        className="text-[#041856] text-[14px] md:text-[16px] xl:text-[30px] xl:font-bold mb-3"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        Stay informed, nothing boring
      </span>
      <span
        className="text-[#010413] text-[10px] md:text-[12px] xl:text-[20px] xl:font-bold ml-1 md:ml-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Subscribe to our newsletter
      </span>
      
      {/* Success/Error Message */}
      {message && (
        <div className={`py-2 px-4 rounded-md text-sm mb-4 ${
          messageType === "success" 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center py-5 xl:py-10">
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="yourname@email.com"
          disabled={loading}
          className="border border-r-0 border-l-0 p-[14px] md:p-[19px] xl:p-[27px] placeholder:text-[8px] text-[8px] md:placeholder:text-[12px] md:text-[12px] xl:placeholder:text-[16px] xl:text-16px border-[#010413] focus:outline-0 w-full leading-normal disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={loading}
          className="border border-r-0 border-l-0 px-5 md:px-16 xl:px-18 py-[12px] md:py-[16px] xl:py-[18px] border-[#010413] text-center w-max leading-normal hover:bg-[#99c8ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          {loading ? (
            <div className="w-4 h-4 md:w-6 md:h-6 xl:w-9 xl:h-9 border-2 border-[#010413] border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <img
              src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330686/Button_SVG_mmlmot.png"
              alt="blue arrow"
              className="w-4 h-4 md:w-6 md:h-6 xl:w-9 xl:h-9 object-cover"
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
