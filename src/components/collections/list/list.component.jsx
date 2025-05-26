import React, { useState } from "react";
import { CollectionData } from "../../../data/collections-data/collection.data";
import { XMarkIcon } from "@heroicons/react/24/solid";

const CollectionsList = () => {
  const [activeProduct, setActiveProduct] = useState(null);

  const toggleModal = (productId) => {
    setActiveProduct(activeProduct === productId ? null : productId);
  };

  return (
    <div className="w-full px-[5%] py-15">
      <p className="text-[#18181b] text-[20px] md:text-[48px] text-center font-semibold mb-3">
        Shop our collections
      </p>
      <p
        className="text-[#483d3d] text-[16px] md:text-[24px] text-center mb-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        T-Shirts, mugs, caps, diaries and more.
        <br />
        We ship anywhere in the world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 lg:gap-y-15 mt-10 md:mt-15">
        {CollectionData.map((data) => (
          <div key={data.id} className="md:p-2">
            <div className="w-full h-[351.61px] md:h-[400px] rounded-sm overflow-hidden ">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-[#1e1e1e] text-[16px] md:text-[20px] font-semibold mt-6 mb-3">
              <p>{data.title}</p>
              <p>&#8358;{data.price}</p>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-[#4a4b54] text-[14px] mb-3">
              <li>{data.size}</li>
              <li>{data.quality}</li>
            </ul>
            <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 items-center mt-6">
              <button className="w-full md:w-[95px] bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[16px] text-center px-4 py-3 rounded-sm hover:bg-[#6941c6] hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
                Buy
              </button>
              <button
                onClick={() => toggleModal(data.id)}
                className="w-full md:w-[104px] bg-[#eef2fe] text-[#010413] font-semibold border border-[#eef2fe] text-[16px] text-center px-4 py-3 rounded-sm hover:bg-[#6941c6] hover:border-[#6941c6] hover:text-[#f7f7f7] transition-colors duration-300 cursor-pointer"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeProduct && (
        <div
          onClick={() => setActiveProduct(null)}
          className="fixed inset-0 bg-[#20202069] z-60 flex justify-center items-center"
        >
          {CollectionData.filter((data) => data.id === activeProduct).map(
            (data) => (
              <div
                key={data.id}
                className="bg-[#fff] w-[90%] md:w-[327px] h-[80vh] md:h-[90vh] lg:h-[564.09px] p-2 rounded-sm overflow-auto"
              >
                <div className="flex justify-between items-center mb-3 pb-1 border-b border-b-[#e6e2dd] text-[#1b212c]">
                  <h2 className=" text-[12px] lg:text-[16px] font-medium  ">
                    Product Details
                  </h2>
                  <XMarkIcon
                    onClick={() => setActiveProduct(null)}
                    className="w-4 h-4 md:w-6 md:h-6 cursor-pointer"
                  />
                </div>
                <p className="text-[#1e1e1e] text-[16px] md:text-[20px] text-center font-semibold my-3">
                  {data.title}
                </p>
                <div className="w-full md:h-[316.11px] rounded-md overflow-hidden">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <ul className="list-disc pl-6 space-y-2 text-[#4a4b54] text-[14px] my-3">
                  <li>{data.size}</li>
                  <li>{data.quality}</li>
                  <li>{data.shipment}</li>
                  <li>{data.shipTime}</li>
                </ul>
                <button className="w-full bg-[#010413] text-[#fff] font-semibold border border-[#010413] text-[14px] md:text-[16px] text-center px-4 py-3 mt-3 rounded-sm hover:bg-[#6941c6] hover:border-[#6941c6] transition-colors duration-300 cursor-pointer">
                  Pay &#8358;{data.price}
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CollectionsList;
