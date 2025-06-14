import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const GeneralForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [userDetails, setUserDetails] = useState({
    message: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const { message, email } = userDetails;

  return (
    <div className="grid grid-cols-[55%_45%] gap-2 mt-20">
      {/* Image Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Starts faded and lower
        whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full lg:h-[800] bg-[#ffc501] rounded-2xl overflow-hidden"
      >
        <img
          src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1749330672/ae3bfa13ccf709991e22a3b74450b625f5b8f7f0_ilrurg.png"
          alt="lady vector image"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Form Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="lg:mt-25"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full pl-6 pr-4 py-4 rounded-xl shadow-md space-y-6"
        >
          {/* Service Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <label className="block md:text-[16px] lg:text-[20px] lg:font-bold text-[#fff]">
              Choose Service
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="mt-2 text-[#667085] w-full p-3 border border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled className="text-[16px] ">
                Select a service
              </option>
              <option value="service1" className="text-[#444]">
                UI/UX Design
              </option>
              <option value="service2" className="text-[#444]">
                Logo Design
              </option>
              <option value="service3" className="text-[#444]">
                Branding
              </option>
              <option value="service4" className="text-[#444]">
                User Research
              </option>
              <option value="service5" className="text-[#444]">
                Redesign
              </option>
              <option value="service6" className="text-[#444]">
                Development
              </option>
              <option value="service7" className="text-[#444]">
                Printing
              </option>
            </select>
          </motion.div>

          {/* User Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <label className="block md:text-[16px] lg:text-[20px] lg:font-bold text-[#fff]">
              Tell us what you need
            </label>
            <textarea
              name="message"
              value={message}
              onChange={handleChange}
              className="mt-2 w-full md:h-[150px] lg:h-[200px] p-3 resize-none border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
              placeholder="Type description here"
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <label className="block md:text-[16px] lg:text-[20px] lg:font-bold text-[#fff]">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="mt-2 w-full p-3 border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
              placeholder="email@example.com"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="w-full bg-[#1342ff] text-[#fff] text-[16px] lg:text-[24px] font-semibold py-3 mt-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
          >
            Send
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default GeneralForm;
