import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Save current scroll position before navigation
    const handleBeforeUnload = () => {
      sessionStorage.setItem(location.key, JSON.stringify(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sessionStorage.setItem(location.key, JSON.stringify(window.scrollY));
    };
  }, [location]);

  useEffect(() => {
    const savedY = sessionStorage.getItem(location.key);

    if (savedY !== null) {
      // Browser back/forward → restore scroll position
      window.scrollTo(0, JSON.parse(savedY));
    } else {
      // New navigation → scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

export default ScrollRestoration;
