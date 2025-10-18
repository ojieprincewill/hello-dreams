import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { toggleSavedClass } from "@/state-slices/saved-classes/savedClassesSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import supabase from "@/supabase/client";
import PaystackPop from "@paystack/inline-js";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/admin-dashboard/ui/sonner";

const CourseCard = ({ course, className = "", user, isAuthenticated }) => {
  const dispatch = useDispatch();
  const savedClasses = useSelector((state) => state.savedClasses);
  const isSaved = savedClasses.includes(course.id);

  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      // Redirect to login with current page as redirect parameter
      navigate(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    dispatch(toggleSavedClass(course.id));
    toast.success("Item saved.");
  };

  const handleOrigins = () => {};

  const handleBuyNow = async () => {
    if (!course) return;
    if (!isAuthenticated || !user?.email) {
      // Redirect to login with current page as redirect parameter
      navigate(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    setPaymentLoading(true);
    setPaymentError(null);
    setPaymentSuccess(false);
    try {
      const { data, error: initError } = await supabase.functions.invoke(
        "paystack-payment-initiation",
        {
          body: {
            email: user.email,
            amount: course.price || 50000,
          },
        }
      );
      if (initError || !data?.access_code || !data?.reference) {
        setPaymentError("Payment initiation failed.");
        setPaymentLoading(false);
        return;
      }
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_live_384ca29b338470fc9f955754a1b4d1fefa83573f",
        reference: data.reference,
        email: user.email,
        amount: (course.price || 50000) * 100,
        onSuccess: async (response) => {
          const { data: verifyData, error: verifyError } =
            await supabase.functions.invoke("enroll-student", {
              body: {
                reference: response.reference,
                courseId: course.id,
                courseTitle: course.title,
                amount: course.price || 50000,
                userId: user.id,
                userEmail: user.email,
              },
            });
          if (verifyError || verifyData?.error) {
            setPaymentError(
              "Verification failed. Payment may not be confirmed."
            );
            console.log(verifyError);
          } else {
            setPaymentSuccess(true);
            setTimeout(() => {
              navigate(`/academy/courses/${course.id}/player`);
            }, 2000);
          }
          setPaymentLoading(false);
        },
        onCancel: () => {
          setPaymentError("Payment was cancelled.");
          setPaymentLoading(false);
        },
      });
    } catch (err) {
      setPaymentError("An unexpected error occurred.");
      setPaymentLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-max md:h-[500px] xl:h-[464.63px] p-4 border border-[#dfdfe2] rounded-2xl flex flex-col ${className}`}
    >
      <div className="relative w-full h-[181.55px] md:h-[221.16px] overflow-hidden rounded-xl mb-4">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
        <button
          onClick={handleBookmark}
          aria-label={isSaved ? "Unsave" : "Save"}
          title={isSaved ? "Remove from saved" : "Save this item"}
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 p-2 rounded-full shadow-md transition duration-200 cursor-pointer"
        >
          <BookmarkIcon
            className={`w-5 h-5 ${
              isSaved ? "text-[#ff7f50]" : "text-[#dfdfdf]"
            }`}
          />
        </button>
      </div>
      <div className="flex flex-row justify-between text-[#010413] pb-2">
        <p className="text-[#010413] text-[20px] md:text-[24px] leading-[1.3] font-semibold">
          {course.title}
        </p>
        <Link
          to={`/academy/courses/${course.id}`}
          onClick={handleOrigins}
          title="View course"
        >
          <ArrowTopRightOnSquareIcon className="w-[23px] h-[23px] md:w-[28px] md:h-[28px] cursor-pointer" />
        </Link>
      </div>
      <p className="text-[16px] md:text-[23px] text-[#667085] font-bold pb-4 ">
        {course.instructor}
      </p>
      <p className="text-[14px] w-max md:text-[16px] text-[#787777] font-bold mb-2 pb-2 border-b-4 border-b-[#efece9] flex items-center ">
        <span className="mr-1">
          <PlayIcon className="w-[13.13px] h-[13.13px] md:w-4 md:h-4 text-[#010413]" />
        </span>
        {course.totalCourses} Courses . {course.totalTime}
      </p>
      <p className="text-[24px] md:text-[27.88px] text-[#010413] font-bold pt-2 ">
        NGN {course.price.toLocaleString()}
      </p>
      {/* Buy Now Button for paid courses */}
      {/* {course.price > 0 && (
        <>
          {isAuthenticated ? (
            <button
              className="w-full mt-6 bg-[#1342ff] text-white text-[16px] font-bold rounded-lg py-3 disabled:opacity-60 hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer"
              onClick={handleBuyNow}
              disabled={paymentLoading}
            >
              {paymentLoading ? "Processing..." : "Buy Now"}
            </button>
          ) : (
            <Link
              to={`/signin?redirect=${encodeURIComponent(window.location.pathname)}`}
              className="w-full mt-6 bg-[#1342ff] text-white text-[16px] font-bold rounded-lg py-3 hover:bg-[#2313ff] transition-colors duration-200 cursor-pointer inline-block text-center"
            >
              Login to Purchase
            </Link>
          )}
          {paymentError && (
            <p className="text-red-500 text-sm mt-2">{paymentError}</p>
          )}
          {paymentSuccess && (
            <p className="text-green-500 text-sm mt-2">
              Payment successful! Redirecting you to the course...
            </p>
          )}
        </>
      )} */}
    </div>
  );
};

export default CourseCard;
