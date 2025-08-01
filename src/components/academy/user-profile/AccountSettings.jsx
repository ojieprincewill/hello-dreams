import React from "react";

const AccountSettings = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <div className="w-full xl:w-[804px] xl:mx-auto h-[150px] border border-[#eaecf0] rounded-sm p-8 mb-6 text-center flex flex-col justify-center items-center">
        <h2 className="text-[#010413] text-[20px] md:text-[28px] xl:text-[32px] mb-2">
          Profile
        </h2>
        <div
          className="text-[#3a4459] text-[14px] md:text-[16px] xl:text-[18px] text-center font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Edit your profile details here
        </div>
      </div>
      <div
        className="bg-white rounded-xl shadow-xl p-8 xl:w-[804px] xl:mx-auto"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-[#667085] text-[12px] mb-1">
              First name
            </label>
            <input
              className="w-full bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]"
              value="Pamela"
              readOnly
            />
          </div>
          <div className="flex-1">
            <label className="block text-[#667085] text-[12px] mb-1">
              Last name
            </label>
            <input
              className="w-full bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]"
              value="Ohaeri"
              readOnly
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#667085] text-[12px] mb-1">
            Email address
          </label>
          <input
            className="w-full bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]"
            value="robertpamela17@yahoo.co.uk"
            readOnly
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div>
            <label className="block text-[#667085] text-[12px] mb-1">
              Country code
            </label>
            <div className="flex items-center bg-[#f7f7f7] text-[14px] md:text-[16px] rounded border border-[#eaecf0] w-max px-3 py-2">
              <span className="text-xl mr-2">🇳🇬</span>
              <select
                className="bg-[#f7f7f7] rounded border-0 text-[#101828] focus:outline-none cursor-pointer min-w-[60px]"
                value={"+234"}
                disabled
              >
                <option value={"+234"}>+234</option>
              </select>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-[#667085] text-[12px] mb-1">
              Phone number
            </label>
            <input
              className="w-full bg-[#f7f7f7] text-[14px] md:text-[16px] rounded p-3 border border-[#eaecf0]"
              value="07016773420"
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="w-max bg-[#1342ff] text-[#fff] text-[14px] md:text-[16px] font-bold rounded-lg py-2 px-3 hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
            disabled={true}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
