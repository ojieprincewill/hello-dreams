import React, { useState, useEffect } from "react";

const AcademyHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      backgroundImage:
        "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1750706964/Academy/landing/2a47486a1d7a57ab44e860d97ec7896316f2ab46_iqdwsy.jpg",
      title: "We Dare to Dream",
      subtitle:
        "Empowering individuals to achieve their fullest potential through skill acquisition and ethical growth",
      textPosition: "left",
    },
    {
      id: 2,
      backgroundImage:
        "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1756799516/Academy/landing/36222312187e1cd1b399589c1791d320058ad40d_aemygq.jpg",
      title: "Knowledge is Power",
      subtitle:
        "Unlocking opportunities through education and skills development and acquisition",
      textPosition: "right",
    },
    {
      id: 3,
      backgroundImage:
        "https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1756799515/Academy/landing/90fac0766ef59a6b3e4d08d44f6a221bc0c63fdf_jopmwh.jpg",
      title: "Transforming Lives",
      subtitle:
        "Building a brighter future by equipping people with valuable tech skills",
      textPosition: "left",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const getTextPositionClasses = (position) => {
    if (position === "left") {
      return "left-8 xl:left-16 bottom-8 xl:bottom-16";
    } else if (position === "right") {
      return "right-8 xl:right-16 bottom-8 xl:bottom-16";
    }
    return "left-8 xl:left-16 bottom-8 xl:bottom-16"; // default
  };

  return (
    <div className="relative h-[320px] md:h-[463px] xl:h-[732px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="hidden md:block absolute top-1/2 left-4 xl:left-8 transform -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="bg-white hover:bg-gray-50 text-gray-800 p-3 xl:p-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 xl:w-6 xl:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div className="hidden md:block absolute top-1/2 right-4 xl:right-8 transform -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="bg-white hover:bg-gray-50 text-gray-800 p-3 xl:p-4 rounded-full cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 xl:w-6 xl:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Floating White Text Section */}
      <div
        className={`absolute ${getTextPositionClasses(
          slides[currentSlide].textPosition
        )} z-20 bg-white rounded-lg shadow-xl p-3 xl:p-8 max-w-md xl:max-w-lg`}
      >
        <div className="text-left">
          <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-1 md:mb-3 xl:mb-4">
            {slides[currentSlide].title}
          </h1>
          <p
            className="text-sm lg:text-base xl:text-lg text-gray-600 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademyHeader;
