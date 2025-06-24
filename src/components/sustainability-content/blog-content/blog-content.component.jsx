import React from "react";

import { useParams } from "react-router-dom";
import { blogData } from "../../../data/sustainability-data/sustainability.data";
import NavBar from "../../landing-header/nav-bar/nav-bar.component";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

const BlogContent = () => {
  const { blogId } = useParams();
  const selectedBlog = blogData.find((blog) => blog.id === Number(blogId));
  const { image, title, authorImage, author, date } = selectedBlog;

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-[435px] md:h-[867px] lg:h-[904px] pt-3 md:pt-0 "
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
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#0d111c] text-[14px] md:text-[16px] "
        >
          How everyday choices like reducing plastic, reusing items, or
          supporting eco-friendly brands can significantly reduce environmental
          footprints.
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
                  src={authorImage}
                  alt={author}
                  className="w-full h-full object-contain "
                />
              </div>

              <p className="text-[#0d111c] text-[12px] md:text-[14px] font-medium">
                {author}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[#0d111c] text-[12px] md:text-[14px] font-semibold">
              Published on
            </p>

            <p className="text-[#0d111c] text-[12px] md:text-[14px] font-medium pt-[15px]">
              {date}
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
          🌱 {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[20px] mb-7"
        >
          Sustainability isn't just for activists or governments — it starts
          with you. The small choices we make each day, when multiplied across
          communities, can lead to powerful environmental change. Living
          sustainably doesn't mean living less; it means living smarter.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[20px] mb-7"
        >
          What Is Sustainable Living?
          <br />
          Sustainable living is about making intentional choices that reduce
          your environmental impact. It focuses on minimizing waste, conserving
          natural resources, and supporting systems that are kind to the planet
          and people.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[20px] mb-7"
        >
          Small Changes That Make a Big Difference
        </motion.p>
        <ol className="list-decimal pl-5 md:pl-10 space-y-3">
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#000000] text-[16px] md:text-[20px]"
          >
            Reduce Single-Use Plastics
            <br />
            Say no to plastic bags, straws, and cutlery. Use reusable water
            bottles, shopping bags, and food containers. Did you know? Switching
            to a reusable water bottle can save up to 1,460 plastic bottles per
            year!
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#000000] text-[16px] md:text-[20px]"
          >
            Recycle and Reuse
            <br />
            Sort your waste properly. Repurpose glass jars, fabric scraps, and
            cardboard into useful items. Donate or resell items instead of
            throwing them away.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#000000] text-[16px] md:text-[20px]"
          >
            Support Eco-Conscious Brands
            <br />
            Choose brands that use sustainable materials and ethical practices.
            Look for certifications like Fair Trade, FSC, or cruelty-free. Buy
            local to reduce transportation emissions and support your community.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#000000] text-[16px] md:text-[20px]"
          >
            Eat More Plant-Based Meals
            <br />
            Incorporating even 1-2 meatless days a week can reduce your carbon
            footprint. Local, seasonal produce requires fewer resources to grow
            and transport.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#000000] text-[16px] md:text-[20px]"
          >
            Save Energy at Home
            <br />
            Unplug devices when not in use. Switch to LED bulbs. Consider
            energy-efficient appliances. Pro tip: Turning off lights when
            leaving a room can save up to 15% on your energy bill yearly.
          </motion.li>
        </ol>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[20px] my-7"
        >
          Why It Matters
          <br />
          These choices may seem small — but when made consistently by millions,
          they shape global demand, influence policies, and drive innovation in
          sustainable practices.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[#000000] text-[16px] md:text-[20px] mb-7"
        >
          Take Action Today
          <br />
          Start with one area of your life. Replace plastic, unplug or try a
          meatless Monday. Track your impact and share your journey — because
          when you live sustainably, you inspire others to do the same.
        </motion.p>
      </div>
    </>
  );
};

export default BlogContent;
