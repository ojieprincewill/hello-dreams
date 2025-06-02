import React from "react";
import NavBar from "../landing-header/nav-bar/nav-bar.component";

const ReferHeader = () => {
  return (
    <div className="relative w-full h-[328.33px] md:h-[463.33px] lg:h-[800px] pt-3 md:pt-0 bg-[url('https://i.ibb.co/3ZX3YXm/eab56f2c011a401ecc213a990cc9f5928d56f398.jpg')] bg-cover bg-center ">
      <NavBar />
      <p
        className="absolute bottom-[140px] left-[50px] md:bottom-[200px] md:left-[150px] lg:bottom-[340px] lg:left-[220px] text-[#ffadd9] text-[13.42px] md:text-[23.17px] lg:text-[40px] text-center font-[900]"
        // style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Refer & Earn
      </p>
    </div>
  );
};

export default ReferHeader;
