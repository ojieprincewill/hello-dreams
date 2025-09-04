import React from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { usePublishedBlogs } from "../../hooks/useBlogs";

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const SustainabilityContent = () => {
  const { data, isLoading, error } = usePublishedBlogs();

  const handleOrigins = () => {};

  // Flatten the paginated data
  const publishedBlogs = data?.pages.flatMap((page) => page.items) || [];

  if (isLoading) {
    return (
      <div className="w-full px-[5%] py-10 flex justify-center items-center">
        <div className="text-lg">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-[5%] py-10 flex justify-center items-center">
        <div className="text-lg text-red-600">
          Error loading articles: {error.message}
        </div>
      </div>
    );
  }

  if (publishedBlogs.length === 0) {
    return (
      <div className="w-full px-[5%] py-10 flex justify-center items-center">
        <div className="text-lg text-gray-600">
          No published articles found.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-[5%] py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
      {publishedBlogs.map((blog, index) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={imageVariants}
          custom={index}
          key={blog.id}
          className="relative w-full h-[448px] p-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="w-full h-[240px] rounded-2xl overflow-hidden">
            <img
              src={
                blog.image_url ||
                "https://via.placeholder.com/400x240?text=No+Image"
              }
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[#ff7f50] text-[16px] font-semibold my-3">
            Hello Dreams
          </p>
          <Link
            to={`/sustainability/${blog.id}`}
            onClick={handleOrigins}
            className="text-[#010413] font-semibold flex justify-between mb-5 hover:text-[#1342ff] transition-colors duration-300 cursor-pointer"
          >
            <p className="text-[24px]">{blog.title}</p>
            <ArrowUpRightIcon className="w-6 h-6" />
          </Link>
          <div className="absolute bottom-0 flex items-center space-x-2 mt-3">
            <div className="w-[40px] h-[40px] bg-[#cfcbdc] rounded-full overflow-hidden">
              <img
                src={
                  blog.author_image_url ||
                  "https://via.placeholder.com/40x40?text=Author"
                }
                alt={blog.author || "Unknown Author"}
                className="w-full h-full object-contain "
              />
            </div>
            <div>
              <p className="text-[#010413] text-[14px] font-semibold">
                {blog.author || "Unknown Author"}
              </p>
              <p className="text-[#667085] text-[14px]">
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SustainabilityContent;
