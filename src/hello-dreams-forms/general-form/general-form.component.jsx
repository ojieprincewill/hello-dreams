import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import supabase from "../../supabase/client";

const GeneralForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    message: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const { service, message, email } = formData;

    if (!service || !message || !email) {
      setError("Missing required fields");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "general-form-handler",
        {
          body: formData,
        }
      );

      if (error) {
        throw error;
      }

      setLoading(false);
      setSuccess("Thank you! Your message has been submitted successfully");
      setFormData({
        service: "",
        message: "",
        email: "",
      });
    } catch (error) {
      console.error("Error: ", error);
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-[55%_45%] gap-2 mt-20">
      {/* Image Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} // Starts faded and lower
        whileInView={{ opacity: 1, y: 0 }} // Moves up and fades in
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full h-full xl:h-[800] bg-[#ffc501] rounded-2xl overflow-hidden"
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
        className="xl:mt-25"
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
            <label className="block md:text-[16px] xl:text-[20px] xl:font-bold text-[#fff]">
              Choose Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
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
            <label className="block md:text-[16px] xl:text-[20px] xl:font-bold text-[#fff]">
              Tell us what you need
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 w-full md:h-[150px] xl:h-[200px] p-3 resize-none border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
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
            <label className="block md:text-[16px] xl:text-[20px] xl:font-bold text-[#fff]">
              Enter your email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full p-3 border placeholder-[#667085] border-[#eaecf0] bg-transparent focus:outline-none rounded-sm"
              placeholder="email@example.com"
            />
          </motion.div>

          {/* Error and Success Messages */}
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            className="w-full bg-[#1342ff] text-[#fff] text-[16px] xl:text-[24px] font-semibold py-3 mt-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default GeneralForm;
