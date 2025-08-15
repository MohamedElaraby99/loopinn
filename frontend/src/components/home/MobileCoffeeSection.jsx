import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Logo from "../Logo";

const MobileCoffeeSection = () => {
  const { i18n } = useTranslation();

  return (
    <section className="py-12 bg-primary lg:hidden">
      <div className="max-w-md mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative">
            <motion.div className="flex-shrink-0">
              <Logo
                className="h-29 md:h-30 lg:h-22 hover:scale-105 transition-transform duration-300"
                isScrolled={true}
              />
            </motion.div>
          </div>
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            animate={{
              opacity: [0, 1, 0],
              y: [0, -20, -40],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-white/60 rounded-full"></div>
              <div className="w-1 h-6 bg-white/50 rounded-full"></div>
              <div className="w-1 h-4 bg-white/60 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/80 mt-6"
        >
          {i18n.language === "ar"
            ? "تجربة قهوة استثنائية"
            : "Exceptional Coffee Experience"}
        </motion.p>
      </div>
    </section>
  );
};

export default MobileCoffeeSection;
