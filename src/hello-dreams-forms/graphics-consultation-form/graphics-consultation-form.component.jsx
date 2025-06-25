import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../../supabase/client';
import GraphicsConsultationSuccess from './graphics-consultation-success.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const GraphicsConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Graphics Design',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: '',
    accompanyingService: '',
    howDidYouHear: '',
  });
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (!formData.service) newErrors.service = 'Service selection is required';
    if (!formData.accompanyingService)
      newErrors.accompanyingService = 'Accompanying service is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccess(null);

    const { type, name, email, phone, ...rest } = formData;

    const payload = {
      type,
      name,
      email,
      phone,
      data: rest,
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        'handle-service-enquiries',
        {
          body: payload,
        },
      );

      if (error) {
        console.error('Supabase Error:', error.message || error);
        toast.error('Submission failed. Please try again.');
        return;
      }

      toast.success('Your enquiry has been submitted!');
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: '',
        accompanyingService: '',
        howDidYouHear: '',
        type: 'Graphics Design',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return success ? (
    <GraphicsConsultationSuccess />
  ) : (
    <div className="bg-[#f8f8f8] lg:bg-[#fff] w-full px-[5%] lg:px-[10%] py-15 md:py-25">
      {isSubmitting && <LoadingSpinner />}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-[20px] md:text-[32px] text-center lg:text-[64px] font-bold mb-5"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Get a free consultation for our Graphics & Branding Services
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="text-[#667085] text-[14px] md:text-[16px] text-center lg:text-[18px] mb-10 lg:mb-20 lg:w-[793px] mx-auto leading-[1.5]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Please provide the details below
      </motion.p>
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:gap-x-20 space-y-8 text-[#000000] md:p-6"
      >
        <div>
          <input type="hidden" name="type" value="Graphics Design" />
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
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
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
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
          <label
            className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4"
            aria-required
          >
            Phone number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
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
          <span className="mt-2 text-[#161616] text-[11px]">
            Tell us a bit about your project and what you hope to achieve
          </span>
        </div>
        <div className="space-y-5 md:space-y-10">
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Select service <span className="text-red-500">*</span>
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
            {errors.service && (
              <p className="text-red-500 text-sm mt-1">{errors.service}</p>
            )}
          </div>
          <div>
            <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
              Choose accompanying services{' '}
              <span className="text-red-500">*</span>
            </label>
            <select
              name="accompanyingService"
              value={formData.accompanyingService}
              onChange={handleChange}
              className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="service1">Logo Design</option>
              <option value="service2">Full Business branding</option>
              <option value="service3">Business Cards</option>
              <option value="service4">Flyers and Brochures</option>
              <option value="service5">Posters and Banners</option>
              <option value="service6">Company Souvenirs</option>
              <option value="service7">Menus</option>
              <option value="service8">Labels and Stickers</option>
              <option value="service9">Notepads and Stationery</option>
              <option value="service10">Others</option>
            </select>
            {errors.accompanyingService && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accompanyingService}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-[12px] md:text-[16px] font-medium mb-3 md:mb-4">
            How did you hear about us?
          </label>
          <select
            name="howDidYouHear"
            value={formData.referral}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-7 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            {isSubmitting ? 'Submitting...' : 'Schedule My Free Consultation'}
          </button>

          {/* {errors && <p className="text-red-600 mt-4"></p>} */}
          {success && <p className="text-green-600 mt-4">{success}</p>}
        </div>
      </motion.form>
    </div>
  );
};

export default GraphicsConsultationForm;
