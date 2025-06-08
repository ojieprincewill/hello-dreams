import React, { useState } from "react";
import { TestimonialData } from "../../data/choose-us-data/choose-us.data";

// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2, // Staggered effect
    },
  }),
};

const TestimonialSection = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleModal = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const closeModal = () => {
    setActiveId(null);
  };

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full px-[5%] py-10">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="space-y-4">
          <p className="text-[24px] text-center md:text-left md:text-[36px] text-[#101828] font-semibold ">
            Don't just take our word for it.
          </p>
          <p className="text-[16px] md:text-[14px] text-center md:text-left lg:text-[20px] md:w-full text-[#475467] md:font-bold leading-[1.5]">
            Hear from some of our amazing customers who are building faster.
          </p>
        </div>

        <div className="flex flex-col w-auto h-max space-y-4 mt-5 lg:mt-0 lg:flex-row lg:space-y-0 lg:space-x-2">
          <Link
            to="/apply-for-mentorship"
            onClick={handleOrigins}
            className="bg-transparent text-[#344054] text-center font-semibold border border-[#d0d5dd] text-[14px] md:text-[16px] px-4 py-4 rounded-lg cursor-pointer"
          >
            Apply for mentorship
          </Link>
          <Link
            to=""
            onClick={handleOrigins}
            className="bg-[#1b212c] text-[#fff] text-center font-semibold border border-[#1b212c] text-[14px] md:text-[16px] px-4 py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            Learn Design from us
          </Link>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-20">
        {TestimonialData.map((data, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            custom={index}
            key={data.id}
            className={`relative w-full h-[480px] ${
              index % 3 === 2 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <img
              src={data.image}
              alt={data.name}
              className="w-full h-full object-cover object-center rounded-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-3 left-[2%] w-[96%] h-[246px] bg-white/30 backdrop-blur-sm p-4 border border-[#ffffff63] overflow-hidden"
            >
              <div className="flex space-x-1 text-[#fff] pb-2">
                <img
                  src="https://i.ibb.co/3m5mScmb/Star-icon.png"
                  alt="star icon"
                  className="w-4 h-4 object-cover"
                />
                <img
                  src="https://i.ibb.co/3m5mScmb/Star-icon.png"
                  alt="star icon"
                  className="w-4 h-4 object-cover"
                />
                <img
                  src="https://i.ibb.co/3m5mScmb/Star-icon.png"
                  alt="star icon"
                  className="w-4 h-4 object-cover"
                />
                <img
                  src="https://i.ibb.co/3m5mScmb/Star-icon.png"
                  alt="star icon"
                  className="w-4 h-4 object-cover"
                />
                <img
                  src="https://i.ibb.co/3m5mScmb/Star-icon.png"
                  alt="star icon"
                  className="w-4 h-4 object-cover"
                />
              </div>
              <p className="text-[24px] md:text-[30px] text-[#fff] font-semibold mb-2 ">
                {data.name}
              </p>
              <p className="text-[15px] md:text-[18px] text-[#fff] mb-2 ">
                {data.course}
              </p>
              <p className="text-[14px] md:text-[16px] text-[#fff] line-clamp-4 leading-[1.5] ">
                {data.text}
              </p>
              <span
                onClick={() => toggleModal(data.id)}
                className="text-[14px] md:text-[16px] text-[#fff] font-semibold hover:text-[#3c4b8479] transition-colors duration-300 cursor-pointer"
              >
                Read more
              </span>
            </motion.div>
            <AnimatePresence>
              {activeId === data.id && (
                <>
                  <div
                    onClick={closeModal}
                    className="fixed inset-0 bg-black/20 z-40"
                  ></div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute overflow-auto z-50 left-[1%] bottom-3 bg-white p-4 rounded-lg shadow-lg w-[98%] h-[95%]"
                  >
                    <p className="text-24px md:text-[30px] font-bold text-[#101828] mb-4">
                      {data.name}
                    </p>
                    <p className="text-14px md:text-[16px] text-[#101828] leading-[1.5]">
                      {data.text}
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
