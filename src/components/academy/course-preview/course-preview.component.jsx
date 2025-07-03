import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Play,
  FileText,
  Lock,
  Award,
  Clock,
  Users,
  Star,
  User,
} from "lucide-react";
import { BookmarkIcon } from "@heroicons/react/24/solid";

const CoursePreview = () => {
  const mockSections = [
    {
      id: "1",
      title: "Course Introduction",
      duration: "45m",
      lessonCount: 5,
      lessons: [
        {
          id: "1-1",
          title: "Welcome to the Course",
          duration: "8:30",
          type: "video",
        },
        {
          id: "1-2",
          title: "How to Use This Course",
          duration: "12:45",
          type: "video",
        },
        {
          id: "1-3",
          title: "Course Resources",
          duration: "10:20",
          type: "article",
        },
      ],
    },
    {
      id: "2",
      title: "HTML Fundamentals",
      duration: "2h 20m",
      lessonCount: 12,
      lessons: [
        { id: "2-1", title: "HTML Basics", duration: "15:30", type: "video" },
        { id: "2-2", title: "HTML Elements", duration: "18:45", type: "video" },
        {
          id: "2-3",
          title: "HTML Attributes",
          duration: "12:20",
          type: "video",
        },
      ],
    },
  ];

  const getLessonIcon = (type) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />;
      case "article":
        return <FileText className="w-4 h-4" />;
      case "quiz":
        return <Award className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="px-[5%] py-10 ">
      <div className="bg-[#efece9] h-[338px] p-5 flex justify-center items-center rounded-md overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=337&fit=crop"
          alt="Course preview"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Title and Description */}
            <div className="space-y-4">
              <p className="text-[#212121] text-[36px] font-semibold ">
                Auto Layout
              </p>
              <p
                className="text-[#667085] text-[14px] leading-[1.5] max-w-[422px] "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Master Figma's Auto Layout—learn alignment, spacing, and
                constraints to create responsive screens for mobile, tablet, and
                desktop.
              </p>
              <button
                className="bg-transparent border-[1.5px] border-[#101828] text-center font-medium px-6 py-2 rounded-md hover:bg-[#1342ff] hover:text-white hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Play className="w-4 h-4 inline" /> Start course
              </button>
            </div>

            {/* Course Content */}
            <div className="space-y-4">
              <p className="text-[#212121] text-[18px] font-semibold">
                Content
              </p>
              <div>
                {mockSections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-[#f7f7f7] text-[14px] flex justify-between items-center overflow-hidden border border-[#eaecf0] rounded-sm p-3 "
                  >
                    <div className="flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <p className="text-[#212121] text-[14px] font-medium ">
                        {section.title}
                      </p>
                      <span className="text-[#787777] text-[12px] ">
                        {section.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-[#78787850] border border-[#78787850] w-[56.87px] h-[4px] rounded-2xl"></div>
                      <BookmarkIcon className="w-[16px] h-[20.57px] text-[#333333] " />
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-transparent border-[1.5px] border-[#101828] text-center font-medium px-6 py-2 rounded-md hover:bg-[#1342ff] hover:text-white hover:border-[#1342ff] transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Load 15 More Sections
              </button>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <p className="text-[#212121] text-[24px] font-semibold ">
                Requirements
              </p>
              <ul
                className="list-disc pl-6 space-y-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <li className="text-[#2d2f31] text-[14px] ">
                  A copy of Figma (a free plan is available on the Figma
                  website).
                </li>
                <li className="text-[#2d2f31] text-[14px] ">
                  Basic knowledge of Figma is required. I recommend watching my
                  Figma Essentials course prior to embarking on this epic
                  adventure.
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-[#212121] text-[24px] font-semibold ">
                Description
              </p>
              <div
                className="text-[#2d2f31] text-[14px] space-y-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <p>
                  Hi there, aspiring Figma enthusiasts! Are you ready to embark
                  on an exhilarating journey with me, Dan Scott, as we unlock
                  the full potential of our Figma skills in the dazzling realm
                  of UX/UI Design using Figma Advanced?
                </p>
                <p>
                  This course is tailor-made for those who have already mastered
                  the fundamental principles of UI/UX Design using Figma. If
                  you've triumphed over my Figma Essentials course or have a
                  sneaking suspicion that there's a treasure trove of unexplored
                  tools, tips, workflows, and updates awaiting your discovery,
                  then look no further! This course is your golden ticket to
                  taking your UI/UX prowess to the next level.
                </p>
                <p>
                  Together, we'll start by delving into the depths of multilevel
                  nested autolayouts, and unravel the secrets used by UX
                  professionals by learning:
                </p>
                <p>
                  Workflow techniques, managing design assets, styles,
                  components, grid and column layouts like true virtuosos.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[#212121] text-[18px] font-semibold ">
                Master auto layout
              </p>
              <p
                className="text-[#414141] text-[14px] space-y-4 leading-[1.5] "
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Explore Auto Layout in Figma, starting with horizontal,
                vertical, and wrap layouts. Manage padding, gaps, and alignment,
                and use constraints like fixed, hug, and fill for optimal
                sizing. Design navigation bars, top bars, headings, cards, and
                lists for mobile, tablet, and desktop. This course prepares you
                to create scalable and adaptable UI designs across devices.
              </p>
              <p className="text-[#1342ff] text-[14px] font-bold space-y-4 leading-[1.5] cursor-pointer ">
                Show more <ChevronDown className="w-4 h-4 inline" />
              </p>
            </div>

            {/* Certificate */}
            <div className="space-y-4">
              <p className="text-[#212121] text-[24px] font-semibold ">
                Certificate
              </p>
              <div className="relative h-[574px] bg-[#eef2fe] rounded-2xl p-6 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1751490284/Academy/course%20preview/71932497220d21a58200c812efe31b01f8162fbe_iitqym.png"
                  alt="certificate"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[55%] p-6 bg-[#f7f7f7]/50 backdrop-blur-sm border-t border-t-[#e5e7eb] overflow-hidden"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Lock className="w-5 h-5 mb-4" />
                  <p className="text-[#212121] text-[18px] font-semibold mb-1 ">
                    Certificate locked
                  </p>
                  <p className="text-[#414141] text-[14px] mb-5">
                    Complete course to unlock your personalised certificate
                  </p>
                  <div className="bg-[#78787850] border border-[#78787850] w-full h-[4px] rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="space-y-4">
              <p className="text-[#212121] text-[24px] font-semibold ">
                Meet your teacher
              </p>
              <div className="flex items-center space-x-7">
                <div className="w-[162px] h-[198px] rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1751491144/Academy/course%20preview/dc82c7df5c7eb1bbe6fd228eb18844a8cadd6cbf_zc7ssz.jpg"
                    alt="instructor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="space-y-7 w-max"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <div className="space-y-2">
                    <p className="text-[#212121] text-[16px] font-semibold">
                      Pamela Ohaeri
                    </p>
                    <p className="text-[#2d2f31] text-[12px] ">
                      Lead Instructor
                    </p>
                  </div>
                  <p className="text-[#2d2f31] text-[14px] leading-[1.5] ">
                    Lorem ipsum dolor sit amet consectetur. Nulla amet velit in
                    eu ut turpis vitae. Id posuere consequat adipiscing sodales
                    pellentesque velit massa id elementum. Eu mi vitae nisl
                    nullam mauris non aliquam. Nec aliquet suscipit elementum
                    nec et cras aliquet.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Info Card */}

            <div className="border-[1.5px] border-[#eaecf0] rounded-xl">
              <div className="p-4 border-b-[1.5px] border-b-[#eaecf0]">
                <p className="text-[#101828] text-[20px] font-semibold ">
                  Auto Layout
                </p>
                <p className="text-[#667085] text-[16px] ">Beginner . 2h 43m</p>
                <button className="w-full bg-[#efece9] border-[0.7px] border-[#eaecf0] text-[#010413] mt-7 text-center font-medium px-6 py-2 rounded-md hover:bg-[#1342ff] hover:text-white hover:border-[#1342ff] transition-colors duration-300 cursor-pointer">
                  Start Course
                </button>
              </div>

              <div className="p-4 my-2 border-b-[1.5px] border-b-[#eaecf0]">
                <p className="text-[#667085] text-[18px] mb-2 ">
                  Course Certificate
                </p>
                <div className="relative h-[240px] bg-[#eef2fe] rounded-2xl p-4 overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dganx8kmn/image/upload/f_webp,q_auto/v1751490284/Academy/course%20preview/71932497220d21a58200c812efe31b01f8162fbe_iitqym.png"
                    alt="certificate"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[55%] p-6 bg-[#f7f7f7]/50 backdrop-blur-sm border-t border-t-[#e5e7eb] overflow-hidden"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <Lock className="w-4 h-4 mb-3" />
                    <p className="text-[#212121] text-[12px] font-semibold mb-1 ">
                      Certificate locked
                    </p>
                    <p className="text-[#414141] text-[10px] mb-5">
                      Complete course to unlock your personalised certificate
                    </p>
                    <div className="bg-[#78787850] border border-[#78787850] w-full h-[4px] rounded-2xl"></div>
                  </div>
                </div>
              </div>
              {/* Skills Section */}
              <div className="p-4">
                <p className="text-[#667085] text-[18px] mb-3 ">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Auto layout",
                    "Figma auto layout",
                    "Responsive design",
                    "Constraints",
                  ].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center px-3 py-2 border-[1.5px] border-[#eaecf0] text-[#667085] text-[14px] rounded-sm"
                    >
                      <span className="mr-1 w-[15px] h-[16px] p-2 flex justify-center items-center bg-[#eaecf0] text-[#212121] text-[10px] rounded-md ">
                        #
                      </span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          ;
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
