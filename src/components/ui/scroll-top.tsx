import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // bisa diganti "auto" kalau mau instan
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
