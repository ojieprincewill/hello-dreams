import React, { useState } from "react";

const AccountSecurity = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormComplete = currentPassword && newPassword && confirmPassword;

  return (
    <div className="w-full px-[5%] py-10">
      <div className="w-full lg:w-[810px] lg:mx-auto h-[150px] border border-[#eaecf0] rounded-sm px-8 py-4 mb-6 flex flex-col justify-center items-center">
        <h2 className="text-[#010413] text-[20px] md:text-[28px] lg:text-[32px] mb-2">
          Account Settings
        </h2>
        <div
          className="text-[#3a4459] text-[14px] md:text-[16px] lg:text-[18px] text-center font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Edit your account settings and change your password here
        </div>
      </div>
      <div
        className="bg-white rounded-xl shadow-xl p-8 lg:w-[877px] lg:mx-auto"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        <div className="mb-6">
          <div className="text-[#667085] text-[12px] mb-1">Email address</div>
          <div className="bg-[#f7f7f7] border border-[#eaecf0] rounded p-3 text-[#101828] font-medium text-[14px] md:text-[16px]">
            robertpamela17@yahoo.co.uk
          </div>
        </div>
        <div>
          <div className="text-[#010413] text-[16px] md:text-[20px] font-medium mb-2">
            Change Password:
          </div>
          <input
            className="w-full mb-5 p-3 rounded bg-[#f7f7f7] border border-[#eaecf0] placeholder:text-[#4b556a] placeholder:text-[14px] md:placeholder:text-[16px] outline-none "
            placeholder="Enter Current Password"
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
          />
          <input
            className="w-full mb-5 p-3 rounded bg-[#f7f7f7] border border-[#eaecf0] placeholder:text-[#4b556a] placeholder:text-[14px] md:placeholder:text-[16px] outline-none "
            placeholder="Enter new Password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
          <input
            className="w-full mb-6 p-3 rounded bg-[#f7f7f7] border border-[#eaecf0] placeholder:text-[#4b556a] placeholder:text-[14px] md:placeholder:text-[16px] outline-none "
            placeholder="Confirm new Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <button
              className="w-max bg-[#1342ff] text-[#fff] text-[14px] md:text-[16px] font-bold rounded-lg py-2 px-3 hover:bg-[#2313ff] disabled:opacity-60 transition-colors duration-200 cursor-pointer"
              disabled={!isFormComplete}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
