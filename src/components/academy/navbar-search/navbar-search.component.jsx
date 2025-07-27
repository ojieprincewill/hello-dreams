import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarSearch = ({ coursesArray }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleOrigins = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = coursesArray.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  }, [searchTerm, coursesArray]);

  return (
    <div className="relative w-[312px] h-[44px]">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-full border-[0.5px] border-[#101828] rounded-sm outline-none p-2"
      />
      {searchTerm && (
        <div className="absolute top-full mt-2 bg-[#fff] border border-[#eaecf0] shadow-lg rounded-xl w-full max-h-[200px] overflow-auto z-80">
          {filteredCourses.length ? (
            filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/academy/courses/${course.id}`}
                onClick={() => setSearchTerm("")}
                className="block px-4 py-2 text-[#010413] hover:bg-gray-100 hover:text-[#1342ff] transition-colors duration-200 cursor-pointer "
              >
                {course.title}
              </Link>
            ))
          ) : (
            <p className="px-4 py-2 text-[#667085]">No matching courses</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
