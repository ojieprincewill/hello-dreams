import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../supabase/client';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import ContactSuccess from './contact-success.component';

const LetsTalk = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.type) newErrors.type = 'Service selection is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const { name, email, type, budget, message } = formData;

    const payload = {
      type: 'General Inquiry',
      name,
      email,
      budget,
      message,
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        'general-enquiry-handler',
        {
          body: payload,
        },
      );
      console.log(payload);
      console.log(data);

      if (error) {
        console.error('Supabase Error:', error.message || error);
        toast.error('Submission failed. Please try again.');
        return;
      }

      toast.success('Your message has been sent!');
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        type: '',
        budget: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return success ? (
    <ContactSuccess />
  ) : (
    <div className="bg-[#f8f8f8] md:bg-[#fff] grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20 px-[5%] py-15 md:py-25">
      {isSubmitting && <LoadingSpinner />}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-[#000000] space-y-6 md:space-y-10 "
      >
        <div>
          <p
            className="text-[20px] md:text-[32px] lg:text-[64px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Let's Talk
          </p>
          <p className="text-[14px] md:text-[15px] lg:text-[20px] lg:font-bold leading-[1.5]">
            Have some big idea or brand to develop and need help? Then reach out
            we'd love to hear about your project and provide help
          </p>
        </div>
        <div>
          <p
            className="text-[16px] md:text-[20px] lg:text-[32px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Email
          </p>
          <a
            href="mailto:support@myhellodreams.com"
            className="block w-max text-[12px] md:text-[16px] lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Support@myhellodreams.com
          </a>
          <a
            href="mailto:partnership@myhellodreams.com"
            className="block w-max text-[12px] md:text-[16px] lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Partnership@myhellodreams.com
          </a>
        </div>
        <div>
          <p
            className="text-[16px] md:text-[20px] lg:text-[32px] font-bold mb-2 md:mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Socials
          </p>
          <a
            href="https://www.linkedin.com/company/hello-dreams-limited/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/hellodreamss/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@HelloDreamsAcademy"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Youtube
          </a>
          <a
            href="https://www.tiktok.com/@myhellodreams?_t=ZM-8wv4XL55NBu&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Tiktok
          </a>
          <a
            href="https://x.com/MyHelloDreams?t=iiEkr0Z3fveby5O8QVEP9A&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Twitter
          </a>
          <a
            href="https://web.facebook.com/profile.php?id=61565243428696"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-max text-[12px] md:text-[16px] underline lg:font-bold mb-3 hover:text-[#598ac2] transition-colors duration-300"
          >
            Facebook
          </a>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="w-full space-y-6 md:space-y-10 text-[#000000] lg:p-6"
      >
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            What type of service are you interested in?{' '}
            <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full text-[#444] text-[10px] md:text-[14px] p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          >
            <option value="" disabled className="text-[#b2b2b2]">
              Select project type
            </option>
            <option value="UI/UX Design" className="text-[#444]">
              UI/UX Design
            </option>
            <option value="Logo Design" className="text-[#444]">
              Logo Design
            </option>
            <option value="Branding" className="text-[#444]">
              Branding
            </option>
            <option value="User Research" className="text-[#444]">
              User Research
            </option>
            <option value="Redesign" className="text-[#444]">
              Redesign
            </option>
            <option value="Development" className="text-[#444]">
              Development
            </option>
            <option value="Printing" className="text-[#444]">
              Printing
            </option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Budget
          </label>
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="$"
            className="w-full p-3 border border-[#c9c9c9] placeholder-[#000000] bg-transparent focus:outline-none rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-bold mb-3 md:mb-4">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-[200px] resize-none p-3 border border-[#c9c9c9] focus:outline-none rounded-sm"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#010413] text-[#fff] text-[14px] md:text-[16px] font-semibold py-3 rounded-4xl hover:bg-[#1342ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </motion.form>
    </div>
  );
};

export default LetsTalk;
