import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const CoffeeAnimation = () => {
  const { i18n } = useTranslation();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Use a working placeholder image URL
  const coffeeCupImage =
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop&crop=center&auto=format";

  // Determine animation direction based on language
  const getAnimationX = () => {
    if (i18n.language === "ar") {
      return -200; // Move left for Arabic (RTL)
    }
    return 200; // Move right for English (LTR)
  };

  // Start animation after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, []);

  // Reset animation when language changes
  useEffect(() => {
    setShouldAnimate(false);
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100); // Small delay for smooth transition

    return () => clearTimeout(timer);
  }, [i18n.language]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-primary overflow-hidden">
      <motion.div
        className="relative"
        initial={{ x: 0, scale: 1 }}
        animate={{
          x: shouldAnimate ? getAnimationX() : 0,
          scale: shouldAnimate ? 0.8 : 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
          delay: shouldAnimate ? 0 : 0,
        }}
      >
        {/* Coffee Cup Image */}
        <motion.div
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 relative"
          initial={{ rotate: 0 }}
          animate={{
            rotate: shouldAnimate ? (i18n.language === "ar" ? -10 : 10) : 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        >
          <img
            src={coffeeCupImage}
            alt="Coffee Cup"
            className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
          />
        </motion.div>

        {/* Floating Animation for Steam Effect */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: shouldAnimate ? [0, 1, 0] : 0,
            y: shouldAnimate ? [0, -20, -40] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: 1.5,
          }}
        >
          <div className="flex space-x-1">
            <div className="w-1 h-6 bg-white/40 rounded-full"></div>
            <div className="w-1 h-8 bg-white/30 rounded-full"></div>
            <div className="w-1 h-6 bg-white/40 rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Decorative Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-20 h-20 border border-white/20 rounded-full"></div>
      </motion.div>

      {/* Language Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
          <p className="text-white/80 text-sm font-medium">
            {i18n.language === "ar" ? "العربية" : "English"} -{" "}
            {i18n.language === "ar" ? "RTL" : "LTR"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CoffeeAnimation;
