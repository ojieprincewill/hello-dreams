import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderInfo = useSelector((state) => state.order.orderInfo);

  const handleClose = () => {
    navigate("/services/our-collection");
  };

  return (
    <div className="bg-[#f7f7f7] px-[5%] xl:px-[10%] py-10 md:py-20 xl:py-30 ">
      <div
        className="bg-[#ffffff] py-5 px-5 md:py-8 md:px-15 rounded-md md:rounded-2xl flex flex-col items-center md:w-max mx-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="w-[70px] h-[70px] md:w-[123px] md:h-[123px] mb-3">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750340153/checkmark_pxkt6o.png"
            alt="check mark"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[#010413] text-[18px] md:text-[26px] xl:text-[32px] text-center font-bold mb-2 ">
          Order successfully placed
        </p>
        <p className="text-[#475467] text-[12px] md:text-[14px] ">
          Thank you for your order
        </p>

        <div className="my-4 w-full">
          <p className="text-[#010413] text-[12px] md:text-[14px] font-bold mb-2 md:mb-4">
            Order details
          </p>
          <div className="px-3 py-1 md:px-5 md:py-2 border border-[#eaecf0] rounded-md ">
            <div className="flex justify-between items-center py-2 border-b border-b-[#eaecf0] ">
              <span className="text-[#667085] text-[12px] md:text-[14px] font-medium">
                Order number
              </span>
              <span className="text-[#010413] text-[12px] md:text-[14px] font-bold ">
                {orderInfo.orderId}
              </span>
            </div>
            <p className="text-[#667085] text-[12px] md:text-[14px] font-medium py-2 border-b border-b-[#eaecf0]">
              Item(s) Ordered
            </p>
            <div className="py-3 space-y-2 border-b border-b-[#eaecf0]">
              {orderInfo.products.map((item, index) => (
                <p
                  key={index}
                  className="text-[#010413] text-[12px] md:text-[14px] font-bold "
                >
                  {item.title}
                </p>
              ))}
            </div>
            <div className="flex justify-between items-center py-2 ">
              <span className="text-[#667085] text-[12px] md:text-[14px] font-medium">
                Total
              </span>
              <span className="text-[#010413] text-[12px] md:text-[14px] font-bold ">
                &#8358;{orderInfo.total}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="bg-[#010413] w-full mt-2 text-[#f7f7f7] font-semibold border border-[#010413] text-[12px] md:text-[14px] xl:text-[16px] px-6 py-3 xl:py-4 rounded-lg hover:text-[#fff] hover:bg-[#1342ff] hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
