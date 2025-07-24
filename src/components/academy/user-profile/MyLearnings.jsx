import React, { useState } from "react";
import { useSelector } from "react-redux";
import { academyItems } from "@/data/academy-data/academy.data";
import FreeClassCard from "../class-cards/free-class-card.component";
import Min20ClassCard from "../class-cards/min20-class-card.component";
import UiuxClassCard from "../class-cards/uiux-class-card.component";

const MyLearnings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { key: "all", label: "All courses" },
    { key: "wishlist", label: "Wishlist" },
    { key: "progress", label: "In progress" },
    { key: "completed", label: "Completed" },
  ];

  const savedClasses = useSelector((state) => state.savedClasses);
  const inProgressClasses = useSelector((state) => state.inProgressClasses);
  const completedClasses = useSelector((state) => state.completedClasses);

  const getCardComponent = (classItem) => {
    if (classItem.category === "uiux") return UiuxClassCard;
    if (classItem.category === "20min") return Min20ClassCard;
    if (classItem.category === "free") return FreeClassCard;
    return UiuxClassCard;
  };

  // Filter for each tab
  const wishlistClasses = academyItems.filter(
    (item) => item.type === "class" && savedClasses.includes(item.id)
  );
  const progressClasses = academyItems.filter(
    (item) => item.type === "class" && inProgressClasses.includes(item.id)
  );
  const completedClassesList = academyItems.filter(
    (item) => item.type === "class" && completedClasses.includes(item.id)
  );
  // All unique interacted classes
  const allClassIds = Array.from(
    new Set([...savedClasses, ...inProgressClasses, ...completedClasses])
  );
  const allInteractedClasses = academyItems.filter(
    (item) => item.type === "class" && allClassIds.includes(item.id)
  );

  return (
    <div className="w-full">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="bg-[#1342ff] pt-6 md:pt-10 pl-4 md:pl-10 pr-4 md:pr-10 mb-6 text-[#fff] relative overflow-hidden">
        {/* Rotated image in header - hidden on mobile */}
        <div className="absolute top-[-370px] right-[-560px] w-[736px] h-auto hidden lg:block">
          <img
            src="https://res.cloudinary.com/dganx8kmn/image/upload/v1752984140/Academy/sign%20up/3f66b694a8196a4df5f2b870dc9901b56806d575_pntsis.png"
            alt="Decorative"
            className="w-full h-full object-cover"
            style={{ transform: "rotate(90.48deg)" }}
          />
        </div>

        <h1 className="text-[20px] md:text-[30px] lg:text-[48px] font-bold mb-3 md:mb-5 relative z-10">
          My Learning
        </h1>
        <div
          className="text-[14px] md:text-[16px] lg:text-[20px] mb-3 md:mb-5 relative z-10"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          13hr 27min{" "}
          <span className="text-[#f7f7f7]/60 text-[12px] md:text-[14px] lg:text-[16px]">
            watched
          </span>
        </div>

        {/* Responsive tabs */}
        <div className="relative z-10 mt-10 md:mt-20 lg:mt-30">
          <div className="flex gap-3 md:gap-8 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`pb-2 transition-colors duration-200 text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer whitespace-nowrap flex-shrink-0 min-w-fit
                   ${
                     activeTab === tab.key
                       ? "border-b-2 sm:border-b-4 md:border-b-6 border-[#d9d9d9] font-semibold text-white"
                       : "text-white/80 border-b-2 sm:border-b-4 md:border-b-6 border-transparent"
                   }
                  `}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {activeTab === "all" && (
          <div>
            {allInteractedClasses.length === 0 ? (
              <div className="text-[#667085] text-center py-8">
                No classes yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {allInteractedClasses.map((classItem) => {
                  const CardComponent = getCardComponent(classItem);
                  return <CardComponent key={classItem.id} data={classItem} />;
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === "wishlist" && (
          <div>
            {wishlistClasses.length === 0 ? (
              <div className="text-[#667085] text-center py-8">
                No saved classes yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {wishlistClasses.map((classItem) => {
                  const CardComponent = getCardComponent(classItem);
                  return <CardComponent key={classItem.id} data={classItem} />;
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === "progress" && (
          <div>
            {progressClasses.length === 0 ? (
              <div className="text-[#667085] text-center py-8">
                No in-progress classes yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {progressClasses.map((classItem) => {
                  const CardComponent = getCardComponent(classItem);
                  return <CardComponent key={classItem.id} data={classItem} />;
                })}
              </div>
            )}
          </div>
        )}
        {activeTab === "completed" && (
          <div>
            {completedClassesList.length === 0 ? (
              <div className="text-[#667085] text-center py-8">
                No completed classes yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {completedClassesList.map((classItem) => {
                  const CardComponent = getCardComponent(classItem);
                  return <CardComponent key={classItem.id} data={classItem} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearnings;
