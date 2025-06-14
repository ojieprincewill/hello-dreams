import React from "react";

const PeopleAndCompanies = () => {
  return (
    <div className="w-full px-[5%] py-10">
      <p
        className="text-[#010413] text-[26px] lg:text-[48px] text-center mb-4"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        People & Companies We Work With
      </p>
      <p
        className="text-[#010413] text-[11px] lg:text-[20px] lg:font-bold text-center mb-3 "
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Explore Our Work: A Showcase of Projects, Achievements, and Creativity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5 md:mt-10 ">
        <div className="bg-[#efece9] px-4 py-4 lg:py-6 rounded-xl overflow-hidden h-[429.3px] lg:h-[800px] relative">
          <div className="bg-[#009379] w-[66.54px] h-[66.54px] lg:w-[124px] lg:h-[124px] mb-4 rounded-tr-[40%] rounded-bl-[40%] overflow-hidden"></div>
          <p
            className="text-[#333333] text-[26px] lg:text-[48px] mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Startups
          </p>
          <p
            className="text-[#010413] text-[8.6px] lg:text-[16px] lg:font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            We thrive on collaborating with startups to bring new and exciting
            products to life. Whether you need to develop your MVP, refine your
            POC, or enhance an existing product, we're here to help. Our app
            designs consistently break launch records and receive stellar
            ratings. Partner with us for exceptional results.
          </p>
          <div className="w-[90%] lg:w-[94%] h-[194.79px] lg:h-[363px] bg-[#f7f7f8] rounded-xl overflow-hidden absolute bottom-4 lg:bottom-6">
            <img
              src="https://i.ibb.co/DfPx94sL/STARTUPS-CARD-IMAGE.png"
              alt="startup image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="bg-[#f7f7f7] px-4 py-4 lg:py-6 rounded-xl overflow-hidden h-[450px] md:h-[429.3px] lg:h-[800px] relative">
          <div className="bg-[#ff6250] w-[66.54px] h-[66.54px] lg:w-[124px] lg:h-[124px] mb-4 rounded-tr-[100%] overflow-hidden"></div>
          <p
            className="text-[#333333] text-[26px] lg:text-[48px] mb-3"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Established Enterprises
          </p>
          <p
            className="text-[#010413] text-[8.6px] lg:text-[16px] lg:font-bold"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Large corporations looking to outsource UI/UX design projects.
            Companies with existing products that need polishing or redesigning.
            SEO and design agencies seeking collaborative partnerships for web
            development projects using Webflow, Framer, and WordPress.
          </p>
          <div className="w-[90%] lg:w-[94%] h-[194.79px] lg:h-[363px] bg-[#efece9] rounded-[20px] overflow-hidden absolute bottom-4 lg:bottom-6">
            <img
              src="https://i.ibb.co/tTgr9s1C/Established-Enterprises-CARD-IMAGE.png"
              alt="established image"
              className="w-full h-full object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleAndCompanies;
