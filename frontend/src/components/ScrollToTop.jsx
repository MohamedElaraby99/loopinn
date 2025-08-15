import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="relative">
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#561818] to-[#8B4513] hover:from-[#6a1f1f] hover:to-[#A0522D] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-white/20 hover:border-white/40"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="العودة إلى الأعلى / Back to top"
            title="العودة إلى الأعلى"
          >
            <FiArrowUp className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-1 transition-all duration-300" />
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#561818] to-[#8B4513] rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 