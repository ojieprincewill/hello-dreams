import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const CheckoutForm = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-10">
      <div className="bg-[#ffffff] rounded-2xl  p-5 md:p-10">
        <Link to="/cart-summary" onClick={handleOrigins}>
          <button className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#eaecf0] hover:bg-[#010413] text-[#010413] hover:text-[#fff] mb-5 transition-colors duration-300 cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 md:h-5 md:w-5 " />
          </button>
        </Link>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#010413] text-[20px] md:text-[24px] font-bold mb-5"
        >
          Customer Shipping Information
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full space-y-6 md:space-y-8 text-[#667085]"
        >
          <div>
            <label
              className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3"
              aria-required
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value=""
              onChange=""
              className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3"
              aria-required
            >
              Email Address
            </label>
            <input
              type="text"
              name="name"
              value=""
              onChange=""
              className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
          </div>
          <div>
            <label
              className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3"
              aria-required
            >
              Delivery Address
            </label>
            <input
              type="text"
              name="name"
              value=""
              onChange=""
              className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 space-y-6 md:space-y-0">
            <div>
              <label
                className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3"
                aria-required
              >
                City
              </label>
              <input
                type="text"
                name="name"
                value=""
                onChange=""
                className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3">
                State/Region
              </label>
              <select
                name="service"
                value=""
                onChange=""
                className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="service1">Lagos</option>
                <option value="service2">FCT</option>
                <option value="service3">Rivers</option>
                <option value="service4">Edo</option>
                <option value="service5">Delta</option>
                <option value="service6">Ibadan</option>
                <option value="service7">Abia</option>
              </select>
            </div>
          </div>
          <div className="pb-5 border-b border-b-[#eaecf0]">
            <label
              className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3"
              aria-required
            >
              Contact/Phone
            </label>
            <input
              type="text"
              name="name"
              value=""
              onChange=""
              className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-2 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </motion.form>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-[#eaecf0] text-[#1a212a] text-[14px] p-3 rounded-md leading-[1.7] "
      >
        Note: our customer service representative will contact you once your
        payment has been received to further confirm order. Delivery takes 2 to
        3 days within lagos, and 4 to 5 days outside Lagos. For orders outside
        the country, we will communicate delivery timelines to you.
      </motion.div>
    </div>
  );
};

export default CheckoutForm;
