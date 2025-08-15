import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiRefreshCw } from "react-icons/fi";

const CoffeeDemo = () => {
  const { t, i18n } = useTranslation();
  const [animationKey, setAnimationKey] = useState(0);

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

  const restartAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setAnimationKey((prev) => prev + 1); // Restart animation with new language
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-amber-900 pt-20">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 rtl:space-x-reverse text-white hover:text-amber-200 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>{t("nav.home")}</span>
            </Link>

            <h1 className="text-xl font-bold text-white">
              {i18n.language === "ar"
                ? "عرض تحريك القهوة"
                : "Coffee Animation Demo"}
            </h1>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 text-sm"
              >
                {i18n.language === "en" ? "العربية" : "English"}
              </button>

              <button
                onClick={restartAnimation}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all duration-200"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span className="text-sm">
                  {i18n.language === "ar" ? "إعادة التشغيل" : "Restart"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          {/* Demo Description */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {i18n.language === "ar"
                ? "تحريك كوب القهوة"
                : "Coffee Cup Animation"}
            </h2>
            <p className="text-lg text-white/80">
              {i18n.language === "ar"
                ? "يبدأ الكوب في المنتصف ثم يتحرك بناءً على اتجاه اللغة - يسار للعربية، يمين للإنجليزية"
                : "Cup starts centered, then moves based on language direction - left for Arabic, right for English"}
            </p>
          </div>

          {/* Animation Demo */}
          <div className="relative h-96 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <motion.div
              key={animationKey}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ x: 0, scale: 1, opacity: 0 }}
              animate={{
                x: getAnimationX(),
                scale: 0.8,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
                delay: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* Coffee Cup Image */}
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 relative"
                initial={{ rotate: 0 }}
                animate={{
                  rotate: i18n.language === "ar" ? -10 : 10,
                }}
                transition={{
                  duration: 1.5,
                  delay: 1.5,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={coffeeCupImage}
                  alt="Coffee Cup"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/30"
                />

                {/* Steam Effect */}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 3,
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-white/60 rounded-full"></div>
                    <div className="w-1 h-6 bg-white/50 rounded-full"></div>
                    <div className="w-1 h-4 bg-white/60 rounded-full"></div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Center Guide */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/20 rounded-full"></div>
          </div>

          {/* Animation Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">
                {i18n.language === "ar" ? "اللغة الحالية" : "Current Language"}
              </h3>
              <p className="text-white/80">
                <span className="font-medium">
                  {i18n.language === "ar" ? "العربية" : "English"}
                </span>
                <br />
                <span className="text-sm">
                  {i18n.language === "ar"
                    ? "اتجاه: من اليمين إلى اليسار"
                    : "Direction: Left to Right"}
                </span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-3">
                {i18n.language === "ar" ? "حركة الكوب" : "Cup Movement"}
              </h3>
              <p className="text-white/80">
                <span className="font-medium">
                  {i18n.language === "ar" ? "يتحرك يساراً" : "Moves Right"}
                </span>
                <br />
                <span className="text-sm">
                  {i18n.language === "ar"
                    ? "مع دوران طفيف"
                    : "With slight rotation"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDemo;
