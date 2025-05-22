import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-[#00000030] flex justify-center items-center h-screen z-60">
      <div className="w-10 h-10 border-4 border-t-[#1342ff] border-[#e2e8f0] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
