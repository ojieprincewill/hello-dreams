import React, { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import supabase from '../../supabase/client';

const CheckoutForm = () => {
  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  // Access cart data from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate cart total
  const cartTotal = parseFloat(
    cartItems
      .reduce(
        (accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity * cartItem.price,
        0,
      )
      .toFixed(2),
  );

  // Calculate total items count
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    deliveryAddress: '',
    city: '',
    state: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const { title, image, price } = cartItems;

    const { email } = formData;
    const orderData = {
      name: formData.name,
      totalItems,
      orderStatus: 'pending',
      orderTotal: cartTotal,
      orderItems: cartItems,
      orderEmail: email,
      orderPhone: formData.phone,
      orderAddress: formData.deliveryAddress,
      orderCity: formData.city,
      orderState: formData.state,
      orderCountry: formData.country,
      orderPaymentReference: data.reference,
    };

    // Include cart data in the submission
    const paymentData = {
      cartTotal,
      email,
    };

    try {
      const { data, error } = await supabase.functions.invoke(
        'paystack-payment-initiation',
        {
          body: paymentData,
        },
      );
      console.log(data);
      console.log(initError);
      if (initError || !data?.access_code || !data?.reference) {
        setError('Payment initiation failed.');
        setLoading(false);
        return;
      }
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_test_xxxxxx', // Optional: You can omit if set in backend
        reference: data.reference,
        email: email,
        amount: cartTotal * 100,
        onSuccess: async (response) => {
          // STEP 2: On success, verify the payment and update the order status
          const { data: verifyData, error: verifyError } =
            await supabase.functions.invoke('collections-checkout-handler', {
              body: {
                reference: response.reference,
                ...formData,
              },
            });

          if (verifyError || verifyData?.error) {
            setError('Verification failed. Payment may not be confirmed.');
          } else {
            setSuccess('Job posted successfully!');
            setFormData({
              jobTitle: '',
              experienceLevel: '',
              workHours: '',
              payType: '',
              jobDescription: '',
              applicationInstructions: '',
              companyName: '',
              companyEmail: '',
            });
          }
          setLoading(false);
        },
        onCancel: () => {
          setError('Payment was cancelled.');
          setLoading(false);
        },
      });
    } catch (err) {
      console.error('Submission Error:', err);
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-[#ffffff] rounded-2xl  p-5 md:p-10">
        <Link to="/cart-summary" onClick={handleOrigins}>
          <button className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[#eaecf0] hover:bg-[#010413] text-[#010413] hover:text-[#fff] mb-5 transition-colors duration-300 cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 md:h-5 md:w-5 " />
          </button>
        </Link>
        <p className="text-[#010413] text-[20px] md:text-[24px] font-bold mb-5">
          Customer Shipping Information
        </p>

        {/* Display cart summary */}
        {cartItems.length > 0 && (
          <div className="bg-[#f8f9fa] p-4 rounded-lg mb-6">
            <p className="text-[#010413] text-[16px] font-semibold mb-2">
              Order Summary ({totalItems} items)
            </p>
            <div className="space-y-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-[#667085] text-[14px]"
                >
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span>
                    &#8358;{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#eaecf0] mt-2 pt-2">
              <div className="flex justify-between text-[#010413] font-semibold">
                <span>Total:</span>
                <span>&#8358;{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
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
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              />
            </div>
            <div>
              <label className="block text-[12px] md:text-[14px] font-medium mb-2 md:mb-3">
                State/Region
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full text-[#b2b2b2] text-[10px] md:text-[14px] font-medium p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="FCT">Federal Capital Territory (FCT)</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
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
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 md:p-3 border border-[#c9c9c9] bg-transparent focus:outline-none rounded-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#010413] text-[#f7f7f7] font-semibold border border-[#010413] mt-2 text-[10.91px] lg:text-[16px] px-6 py-3 lg:py-4 rounded-lg hover:text-white hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-[#eaecf0] text-[#1a212a] text-[14px] p-3 rounded-md leading-[1.7] ">
        Note: our customer service representative will contact you once your
        payment has been received to further confirm order. Delivery takes 2 to
        3 days within lagos, and 4 to 5 days outside Lagos. For orders outside
        the country, we will communicate delivery timelines to you.
      </div>
    </div>
  );
};

export default CheckoutForm;
