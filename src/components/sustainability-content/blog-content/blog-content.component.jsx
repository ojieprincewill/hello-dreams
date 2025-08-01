import React from "react";
import { useParams } from "react-router-dom";
import { useBlogById } from "../../../hooks/useBlogs";
import NavBar from "../../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const BlogContent = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading, error } = useBlogById(blogId);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-lg">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-lg text-red-600">
          Error loading article: {error.message}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-lg text-gray-600">Article not found.</div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${
            blog.image_url ||
            "https://via.placeholder.com/1200x600?text=No+Image"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-[435px] md:h-[867px] xl:h-[904px] pt-3 md:pt-0 "
      >
        <NavBar />
      </div>
      <div className="w-full px-[5%] py-10">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#010413] text-[20px] md:text-[24px] font-semibold mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {blog.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#0d111c] text-[14px] md:text-[16px] "
        >
          {blog.content
            ? blog.content.substring(0, 200) + "..."
            : "No content available"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-row space-x-8 my-5"
        >
          <div className="space-y-2">
            <p className="text-[#0d111c] text-[12px] md:text-[14px] font-semibold">
              Written by
            </p>
            <div className="flex items-center space-x-2 mt-3">
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

              <p className="text-[#0d111c] text-[12px] md:text-[14px] font-medium">
                {blog.author || "Unknown Author"}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[#0d111c] text-[12px] md:text-[14px] font-semibold">
              Published on
            </p>

            <p className="text-[#0d111c] text-[12px] md:text-[14px] font-medium pt-[15px]">
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[24px] mb-7 pt-7"
        >
          🌱 {blog.title}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[20px] mb-7 whitespace-pre-wrap"
        >
          {blog.content}
        </motion.div>
      </div>
    </>
  );
};

export default BlogContent;
