import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

const UserDropdown = ({ active, setActive }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  const menuItems = [
    { key: "learnings", label: "My Learning" },
    { key: "security", label: "Account Security" },
    { key: "settings", label: "Settings" },
    { key: "help", label: "Help Center" },
    { key: "logout", label: "Log out" },
  ];

  return (
    <>
      <Link
        to="/membership"
        className="hidden xl:inline bg-white text-[#010413] border border-[#010413] font-medium text-[18px] px-3 py-2 rounded-md transition-colors duration-300 hover:text-[#1342ff] cursor-pointer"
        onClick={handleOrigins}
      >
        Manage Membership
      </Link>
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="bg-[#763d36] w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16 text-[#fff] uppercase text-[14px] md:text-[18px] xl:text-[20px] text-center font-bold flex justify-center items-center rounded-full cursor-pointer"
        >
          PO
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 mt-2 w-max bg-white border border-gray-200 rounded-lg shadow-md z-50 overflow-hidden p-2"
            >
              <div className="hidden xl:flex space-x-2 items-center px-4 py-3 border-b border-b-[#eaecf0] ">
                <div className="bg-[#763d36] w-8 h-8 md:w-12 md:h-12 xl:w-16 xl:h-16 text-[#fff] uppercase text-[14px] md:text-[18px] xl:text-[20px] text-center font-bold flex justify-center items-center rounded-full cursor-pointer">
                  PO
                </div>
                <div className="space-x-1">
                  <p className="text-[16px] md:text-[18px] xl:text-[20px] text-[#101828]">
                    Pamela Ohaeri
                  </p>
                  <p className="text-[12px] text-[#101828]">
                    robertpamela17@gmail.com
                  </p>
                </div>
              </div>
              <ul>
                {menuItems.map((item) => (
                  <li key={item.key}>
                    <button
                      className={`w-full text-[14px] md:text-[16px] p-2 md:p-4 flex items-center gap-2 cursor-pointer ${
                        active === item.key ? "bg-[#f0f4ff]" : ""
                      } hover:bg-[#f7f7f7]`}
                      onClick={() => {
                        if (item.key === "logout") {
                          // Call logout function here
                          // logoutUser();
                          navigate("/academy");
                        } else {
                          navigate("/userprofile", {
                            state: { active: item.key },
                          });
                        }
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UserDropdown;
