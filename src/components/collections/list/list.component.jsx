// components/collections-list.component.jsx
import React, { useRef, useEffect } from 'react';
import { useInfiniteCollections } from '../../../hooks/useInfiniteCollections';
import CartIcon from '../cart-icon/cart-icon.component';
import Product from '../product/product.component';
import Quickview from '../quickview/quickview.component';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: index * 0.1,
    },
  }),
};

const CollectionsList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteCollections(6);

  useEffect(() => {
    fetchNextPage(); // Fetch first page manually on mount
  }, []);

  console.log('DATA:', data);

  const quickviewHidden = useSelector((state) => state.quickview.hidden);

  const loadMoreRef = useRef(null);

  // Use IntersectionObserver to trigger fetchNextPage when user scrolls near bottom
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = data?.pages.flatMap((page) => page.data) || [];
  console.log('ALL PRODUCTS:', allProducts);

  return (
    <div id="shop-section" className="w-full px-[5%] py-15">
      <p className="text-[#18181b] text-[20px] md:text-[48px] text-center font-semibold mb-3">
        Shop our collections
      </p>
      <p
        className="text-[#483d3d] text-[16px] md:text-[24px] text-center mb-3"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        T-Shirts, mugs, caps, diaries and more.
        <br />
        We ship anywhere in the world.
      </p>

      <div className="w-max mr-5 ml-auto">
        <CartIcon />
      </div>

      {isLoading ? (
        <div className="text-center mt-10">Loading products...</div>
      ) : isError ? (
        <div className="text-center text-red-500 mt-10">{error.message}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 lg:gap-y-15 mt-10">
            {allProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                custom={index}
              >
                <Product product={product} />
              </motion.div>
            ))}
          </div>

          <div
            ref={loadMoreRef}
            className="h-16 mt-10 flex items-center justify-center"
          >
            {isFetchingNextPage && (
              <p className="text-sm text-gray-500">Loading more products...</p>
            )}
            {!hasNextPage && (
              <p className="text-sm text-gray-400">No more products to load.</p>
            )}
          </div>
        </>
      )}

      <AnimatePresence>{!quickviewHidden && <Quickview />}</AnimatePresence>
    </div>
  );
};

export default CollectionsList;
